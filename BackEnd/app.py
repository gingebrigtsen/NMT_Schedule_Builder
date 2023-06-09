# ---------------- Imports and Data
import atexit, time, threading, re
from flask import Flask, session, request, jsonify
from flask_session import Session
from flask import make_response
from flask_cors import CORS
from traceback import print_exc
from datetime import datetime, timedelta
import pandas as pd
import redis
from Models import CollectData
from Services import requestService


# ---------------- Settings


# Backend Config
app = Flask(__name__)
app.config["DEBUG"] = False # T=dev F=prof

# Session Config
app.config['SECRET_KEY'] = '515723' # Use a random and secure key
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_REDIS'] = redis.from_url('redis://localhost:6379')
app.config['SESSION_PERMANENT'] = False # Set non-permanent session
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=24) # Force expiry after 24h
app.config['SESSION_USE_SIGNER'] = True # Sign session cookies
app.config['SESSION_FILE_THRESHOLD'] = 100 # increase number of session files storage
app.config['SESSION_FILE_MODE'] = 600 # set file mode for stricter session file access
Session(app)

# CORS Config
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)


# ---------------- ROUTES


# DEBUG: index route
@app.route('/')
def index():
    return "Hello World!"


# helper function
# checking whether courses overlap to determine timeconflict status
def time_overlap(time1, time2):
    # print('entered time_overlap\n') # DEBUG
    start1, end1 = [int(x) for x in time1.split('-')] # get time1 start/end
    start2, end2 = [int(x) for x in time2.split('-')] # get time2 start/end
    # return boolean t/f if start/ends overlap
    return ((start1 >= start2 and start1 < end2) or (start2 >= start1 and start2 < end1))


# helper function
# checking time conflict using course data and time_overlap()
def time_conflict(item, items):
    # print('entered time_conflict\n')  # DEBUG
    for i in items:
        # skip comparing the same courses
        if i['CRN'] == item['CRN']:
            continue
        
        # Ensure that both item['Days'] and i['Days'] are strings
        item_days = item['Days'] if type(item['Days']) == str else "".join(item['Days'])
        i_days = i['Days'] if type(i['Days']) == str else "".join(i['Days'])

        # Determine overlap flag
        if set(item_days) & set(i_days): # if there are Days values
            if any(day in item['Days'] for day in i['Days'].replace(' ','')) and time_overlap(item['Time'], i['Time']): # if they overlap on the same day
                return True
    return False


# declare and initialize usrCart session variable
# prepares it for use in result, cart, calendar, cal
@app.before_request
def init_usrCart():
    if not session.get('usrCart'):
        session['usrCart'] = []


# DEBUG
# clear the entire cart session variable
@app.route('/api/clear_cart', methods=['POST'])
def clear_cart():
    # clear session var
    session['usrCart'] = []

    # clear modification flag
    session['modified'] = None

    # return status msg
    return {"message": "cart cleared"}


# Adding selected search results to usrcart session variable
# collects data from request, preserving json format
# stores for later service to Cart, Cal
@app.route('/api/add_to_cart', methods=['POST'])
def add_to_cart():
    # get added items
    items = request.json.get('addItems', [])

    # get session var
    usrCart = session['usrCart']
    # add selected items
    for i in items:
        if isinstance(i, dict):
            usrCart.append(i) # add items

    # update session var
    session['usrCart'] = [item for item in usrCart if item is not None]

    # modification flag
    session['modified'] = True
    # print('Add to cart:\n', session['usrCart']) # DEBUG
    # print('addSID:\n', session.sid) # DEBUG
    return {"message": "Items added to cart"}


# Deleting selected cart items from usrcart session variable
# ensures cart and cal have user choices accurately
@app.route('/api/del_cart', methods=['POST'])
def del_cart():
    # get deletion items
    items = request.json.get('delItems', [])

    # get session var
    usrCart = session['usrCart']
    # delete selected items
    for i in usrCart:
        if isinstance(i, dict) and i in items:
            usrCart.remove(i) # del items

    # update session var
    session['usrCart'] = [item for item in usrCart if item is not None]

    # modification flag
    session['modified'] = True
    # print('deleted objects from cart:\n', session['usrCart']) # DEBUG
    # print('delSID:\n', session.sid) # DEBUG
    return {"message": "Items removed from cart"}


# Getting cart items to display in cart
# pulls from session variable in json format, and sends to page
@app.route('/api/get_cart', methods=['GET', 'OPTIONS'])
def get_cart():
    try:
        # print('usrCart:\n', session['usrCart']) # DEBUG
        # print('getSID:\n', session.sid) # DEBUG
        # Handle preflight requests
        if request.method == 'OPTIONS':
            response = make_response()
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
        else:
            # Check if 'usrCart' is in the session
            if session.get('modified', None) == True:
                # get items from session
                # print('realget\n') # DEBUG
                items = session.get('usrCart')
            else:
                # print('falseget\n') # DEBUG
                items = []  # Set items to empty if no 'usrCart'

            # add fields for isSelected, cF, all set to false by default
            for item in items:
                if item:
                    item['isSelected'] = False
                    item['cF'] = time_conflict(item, items)
            
            # send to page
            response = make_response({"items": items})
            # print('get_cartResponse:\n', response.data) # DEBUG
        return response
    except Exception as e:
        print(f'Error: {e}')
        response = make_response({"error": str(e)}, 500)
        return response


# get cart items to display as events
# pulls from session variable in json formate, sends to page
@app.route('/api/get_events', methods=['GET', 'OPTIONS'])
def get_events():
    try:
        # print('entered get_events\n') # DEBUG
        # Handle preflight requests
        if request.method == 'OPTIONS':
            response = make_response()
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response
        
        # get items from session
        # print('get_events:\n', session['usrCart']) # DEBUG
        items = session.get('usrCart', [])

        # parse into fullcalendar format
        events = []
        reference_date = datetime.now().date() - timedelta(days=datetime.now().date().weekday())
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
                startD = reference_date + timedelta(days=dayMap[day])
                start = datetime.combine(startD, startT.time())
                end = datetime.combine(startD, endT.time())

                # add reformatted course data to events to be rendered
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
        # print('get_eventsResponse:\n', response.data) # DEBUG
        return response
    except Exception as e:
        print(f'Error: {e}')
        response = make_response({"error": str(e)}, 500)
        return response


# helper function for serve_query
# parse, limit, sanitize text searches
# removes dangerous chars from input strings
def sanitize(text):
    allowed=re.compile(r'[^a-zA-Z0-9\s]')
    return allowed.sub("", text)


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
            df_term = pd.read_csv(f'Models/csv/{term}P.csv', keep_default_na=False)
            # drop NaNs
            df_term = df_term.drop(['Float'], axis=1)

            # extracting entries matching user text query
            # from data, adding to results
            query = data['query'].strip()[:32]
            query = sanitize(query).lower()
            df_filtered = df_term[df_term.apply(lambda row: row.astype(str).str.lower().str.contains(query).any(), axis=1)]
            # print('query:\n', df_filtered) # DEBUG

            # add filtered data to search results
            results += df_filtered.to_dict('records')
        # Search option 1
        else:
            # opening the proper csv by term selection
            term = data.get('terms', 'Spring 2023')[0]['label']
            df_term = pd.read_csv(f'Models/csv/{term}P.csv', keep_default_na=False)
            # drop NaNs
            df_term = df_term.drop(['Float'], axis=1)

            # extract dept and lvl from Course column
            df_term['Department'] = df_term['Course'].str.extract('([A-Z]+)')[0]
            # print(df_term['Department']) # DEBUG
            df_term['Lvl'] = df_term['Course'].str.extract('([0-9]{1,4})')[0]
            # print(df_term['Lvl']) # DEBUG

            # filter data by selected subjects
            selected_subjects = [option['label'].split()[-1] 
                for option in data['subjects'] if option.get('checked')]
            # print('ss:\n', selected_subjects) # DEBUG
            df_filtered = df_term[df_term['Department'].isin(selected_subjects)]
            # print('subject:\n', df_filtered) # DEBUG

            # filter data by selected levels
            # get first digit for each option label
            selected_levels = [option['label'].split()[0][0] for option in data['levels'] if option.get('checked')]
            # print('sl:\n', selected_levels) # DEBUG
            # join digits via pipes for regex OR operation
            level_rexp = '|'.join(selected_levels)
            # print('lvlrxp:\n', level_rexp) # DEBUG
            # format into parens, followed by any 1-3 digits in the range 0-9
            level_rexp = f'({level_rexp})([0-9]{{1,3}})'
            # print('lvlrxp:\n', level_rexp) # DEBUG
            # Filter the frame
            if df_filtered.empty:
                df_filtered = df_term[df_term['Lvl'].str.match(level_rexp)]
            else:
                df_filtered = df_filtered[df_filtered['Lvl'].str.match(level_rexp)]
            # print('level:\n', df_filtered) # DEBUG

            # remove temp dept and lvl columns
            df_filtered = df_filtered.drop(['Department', 'Lvl'], axis=1)
            # print('cleanup:\n', df_filtered) # DEBUG

            # add filtered data to search results
            results += df_filtered.to_dict('records')

        # return the search results as JSON
        # print('results:\n', results) # DEBUG
        response = make_response(jsonify(results))
        # print('resultsJSON:\n', response.data) # DEBUG
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


# # Every 24 hours, check banweb if new terms&subjects are available
# # then update Banweb Data CSVs
# # Doesn't require input parameters
# # No returns
def updateBanweb(force=False):
    global hasScraped 
    while True:
        if not force or hasScraped:
            time.sleep(24*60*60)
        requestService.dateCheck()
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
    uT=threading.Thread(target=updateBanweb, args=(True,))
    uT.start()