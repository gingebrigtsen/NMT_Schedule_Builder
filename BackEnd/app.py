# ---------------- Imports and Data
import atexit, time, threading
from flask import Flask, session, request, jsonify
from traceback import print_exc
from flask import make_response
from flask_cors import CORS
import smtplib, json
import pandas as pd
from Models import CollectData
from Services import requestService


# ---------------- Settings


# Backend Config
app = Flask(__name__)
app.config["DEBUG"] = True
# CORS Configuration
CORS(app, resources={r"/api/*": {"origins": "*"}})


# ---------------- ROUTES


# DEBUG: index route
@app.route('/')
def index():
    return "Hello World!"


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

        # results data structure to be converted to json
        results = []

        # open and search CSV using pandas
        # since CSVs are separated by term, go by selected term
        # opening the proper csv by term selection
        term = data.get('term', 'Spring 2023')
        df_term = pd.read_csv(f'Models/csv/{term}P.csv')

        # building query response
        # Search Option 2
        if isinstance(data['query'], str) and data['query'].strip():
            # handling custom search inputs

            # extracting entries matching user text query 
            # from data, adding to results
            query = data['query'].strip()
            df_filtered = df_term[df_term.apply(lambda row: row.astype(str).str.contains(query).any(), axis=1)]

            # add filtered data to search results
            results += df_filtered.to_dict('records')
        # Search option 1
        else:
            # extract dept and lvl from Course column
            df_term['Department'] = df_term['Course'].str.extract('([A-Z]+)')[0]
            df_term['Lvl'] = df_term['Course'].str.extract('([0-9]+)')[0]

            # filter data by selected subjects
            selected_subjects = [option['label'].split()[1] 
                for option in data['subjects'] if option.get('checked')]
            df_filtered = df_term[df_term['Department'].isin(selected_subjects)]

            # filter data by selected levels
            selected_levels = [option['label'].split()[0] 
                for option in data['levels'] if option.get('checked')]
            df_filtered = df_filtered[df_filtered['Lvl'].isin(selected_levels)]

            # remove temp dept and lvl columns
            df_filtered = df_filtered.drop(['Department', 'Lvl'], axis=1)

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