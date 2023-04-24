# ---------------- Imports and Data
import atexit, datetime, time, threading
from flask import Flask, session, request, jsonify
from flask import make_response
import smtplib, json
import pandas as pd
from flask_cors import CORS, cross_origin
from Models import CollectData
from Services import requestService


# ---------------- Settings


# Backend Config
app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)


# ---------------- ROUTES


# DEBUG: index route
@app.route('/')
def index():
    return "Hello World!"


# Handling lookup queries csv->json->frontend
# collects and parses query from frontend lookup form
# uses pandas to construct a response to the query
# returns jsonify data for display in results table
@app.route('/serve_query', methods=['POST'])
@cross_origin(origins=['http://localhost:3000/lookup'])
def serve_query():
    # get query from request body
    data = request.get_json()

    # results data structure to be converted to json
    results = []

    # open and search CSV using pandas
    # since CSVs are separated by term, go by selected term
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
        # opening the proper csv by term selection
        term = data['term']
        df_term = pd.read_csv(f'Models/csv/{term}P.csv')

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
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response


# Sending Issue Reporting Forms to NMT registrar
# Collects and parses data from frontend report form
# uses SMTP to construct and send a simple email containing form contents
# returns http status code on success
@app.route('/submit_form', methods=['POST'])
@cross_origin(origins=['http://localhost:3000/report'])
def submit_form():
    # handling json information sent by report form
    data = json.loads(request.data)
    email = data['email']
    message = data['message']
    subject = data['subject']

    # SMTP configuration
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    smtp_user = 'nmt.scheduler@gmail.com'
    smtp_password = 'NMT/SeniorDesign2023'

    # sending SMTP message
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        # initialize and login
        server.starttls()
        server.login(smtp_user, smtp_password)

        # send mail
        emailMessage = f'Subject: {subject}\n\n{message}\n\nFrom: {email}'
        server.sendmail(smtp_user, 'gabriel.ingebrigtsen-leiker@student.nmt.edu', emailMessage)
    
    # return a response
    return '', 204


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