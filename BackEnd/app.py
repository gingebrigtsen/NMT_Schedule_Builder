# ---------------- Imports and Data
import atexit, time, threading, json
from flask import Flask, session, request, jsonify
from flask_session import Session
from flask import make_response
from flask_cors import CORS
from traceback import print_exc
from datetime import datetime, timedelta
import pandas as pd
from Models import CollectData
from Services import requestService


# ---------------- Settings


# Backend Config
app = Flask(__name__)
app.config["DEBUG"] = True

# Session Config
app.config['SECRET_KEY'] = '515723' # Use a random and secure key
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

# CORS Config
CORS(app, resources={r"/api/*": {"origins": "*"}})


# ---------------- ROUTES


# DEBUG: index route
@app.route('/')
def index():
    return "Hello World!"


# helper function
# checking whether courses overlap to determine timeconflict status
def time_overlap(time1, time2):
    start1, end1 = [int(x) for x in time1.split('-')]
    start2, end2 = [int(x) for x in time2.split('-')]
    return ((start1 >= start2 and start1 < end2) or (start2 >= start1 and start2 < end1))


# helper function
# checking time conflict using course data and time_overlap()
def time_conflict(item, items):
    for i in items:
        # skip comparing the same courses
        if i['CRN'] == item['CRN']:
            continue
        if set(item['Days'].split()) & set(i['Days'].split()):
            if time_overlap(item['Time'], i['Time']):
                return True
    return False


# Adding selected search results to usrcart session variable
# collects data from request, preserving json format
# stores for later service to Cart, Cal
@app.route('/api/add_to_cart', methods=['POST'])
def add_to_cart():
    items = request.json.get('items', [])
    session['usrCart'] = items
    return {"message": "Items added to cart"}


# Getting cart items to display in cart
# pulls from session variable in json format, and sends to page
@app.route('/api/get_cart', methods=['GET', 'OPTIONS'])
def get_cart():
    # Handle preflight requests
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
        
    # get items from session
    items = session.get('usrCart', [])

    # add fields for isSelected, cF, all set to false by default
    for item in items:
        item['isSelected'] = False
        item['cF'] = time_conflict(item, items)
    
    # send to page
    response = make_response({"items": items})
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


# get cart items to display as events
# pulls from session variable in json formate, sends to page
@app.route('/api/get_events', methods=['GET', 'OPTIONS'])
def get_events():
    # Handle preflight requests
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    
    # get items from session
    items = session.get('usrCart', [])

    # parse into fullcalendar format
    events = []
    for item in items:
        # parse days
        dayMap = {'M': 0, 'T': 1, 'W': 2, 'R': 3, 'F': 4}
        days = item['Days'].strip().split()

        # parse start/end
        startT, endT = item['Time'].split('-')
        startT = datetime.strptime(startT, '%H%M')
        endT = datetime.strptime(endT, '%H%M')

        # generate separate events for each day in days
        for day in days:
            startD = datetime.now().date() + timedelta(days=(dayMap[day] - datetime.now().weekday()) % 7)
            start = datetime.combine(startD, startT.time())
            end = datetime.combine(startD, endT.time())

            # add reformatted course data to events
            events.append({
                'title': item['Course'],
                'start': start.isoformat(),
                'end': end.isoformat(),
                'details': [
                    item['Title'],
                    item['Location'],
                    f"{startT.strftime('%I:%M%p')} - {endT.strftime('%I:%M%p')}",
                    item['*Campus'],
                    item['Instructor'],
                ],
            })

    # send events to page
    response = make_response({"items": events})
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


# Handling lookup queries csv->json->frontend
# collects and parses query from frontend lookup form
# uses pandas to construct a response to the query
# returns jsonify data for display in results table
@app.route('/api/serve_query', methods=['POST', 'OPTIONS'])
def serve_query():
    try:
        # Handle preflight requests
        if request.method == 'OPTIONS':
            response = make_response()
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response

        # get query from request body
        data = request.get_json()
        # print(data.keys()) DEBUG

        # results data structure to be converted to json
        results = []

        # open and search CSV using pandas
        # since CSVs are separated by term, go by selected term
        # building query response
        # Search Option 2
        if (isinstance(data['query'], str) and data['query'].strip()):
            # opening the proper csv by term selection
            term = data.get('terms', 'Spring 2023')[0]['label']
            df_term = pd.read_csv(f'Models/csv/{term}P.csv')

            # extracting entries matching user text query 
            # from data, adding to results
            query = data['query'].strip()
            df_filtered = df_term[df_term.apply(lambda row: row.astype(str).str.contains(query).any(), axis=1)]
            print(df_filtered) # DEBUG

            # add filtered data to search results
            results += df_filtered.to_dict('records')
        # Search option 1
        else:
            # opening the proper csv by term selection
            term = data.get('terms', 'Spring 2023')[0]['label']
            df_term = pd.read_csv(f'Models/csv/{term}P.csv')

            # extract dept and lvl from Course column
            df_term['Department'] = df_term['Course'].str.extract('([A-Z]+)')[0]
            df_term['Lvl'] = df_term['Course'].str.extract('([0-9]{1,4})').str[0]

            # filter data by selected subjects
            selected_subjects = [option['label'].split()[1] 
                for option in data['subjects'] if option.get('checked')]
            df_filtered = df_term[df_term['Department'].isin(selected_subjects)]
            print(df_filtered) # DEBUG

            # filter data by selected levels
            selected_levels = [option['label'].split()[0] 
                for option in data['levels'] if option.get('checked')]
            df_filtered = df_filtered[df_filtered['Lvl'].isin(selected_levels)]
            print(df_filtered) # DEBUG

            # remove temp dept and lvl columns
            df_filtered = df_filtered.drop(['Department', 'Lvl'], axis=1)
            print(df_filtered) # DEBUG

            # add filtered data to search results
            results += df_filtered.to_dict('records')

        # return the search results as JSON
        response = make_response(jsonify(results))
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except Exception as e:
        # debugging response data transferring
        print("Error:", e)
        print_exc() # exception traceback
        return make_response(jsonify({"error": "An internal server error occurred"}), 500)


# ---------------- METHODS


# global var
hasScraped = False


# Every 24 hours, check current date against public Banweb
# Doesn't require input parameters
# No returns
def checkDate(force=False):
    global hasScraped 
    while True:
        if not force or hasScraped:
            time.sleep(24*60*60)
        requestService.dateCheck()
        hasScraped = True


# # Every 24 hours, update Banweb Data CSVs
# # Doesn't require input parameters
# # No returns
def updateBanweb(force=False):
    global hasScraped 
    while True:
        if not force or hasScraped:
            time.sleep(24*60*60)
        CollectData.collectData()
        hasScraped = True


# # Properly joining and closing 
# # separate threads on shutdown
def cleanup():
    t = threading.enumerate()
    for thread in t:
        if thread is not threading.current_thread():
            thread.join()
atexit.register(cleanup) # only cleanup threads on shutdown


# ---------------- Flask Boilerplating
if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=5000)
    dT=threading.Thread(target=checkDate, args=(True,))
    #dT.start()
    uT=threading.Thread(target=updateBanweb, args=(True,))
    #uT.start()