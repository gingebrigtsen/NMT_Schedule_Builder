# Imports and Data
import atexit, datetime, time, threading
from flask import Flask, session, request, jsonify
from flask_cors import CORS
from Controllers import requestController
from Models import CollectData
from Services import requestService


# Backend Config
app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app, supports_credentials=True, expose_headers=["Content-Disposition"])


# App BODY & ROUTES:

# Every 24 hours, check current date against public Banweb
# Doesn't require input parameters
# No returns
def checkDate():
    while True:
        requestService.dateCheck()
        time.sleep(24*60*60)
dT=threading.Thread(target=checkDate)
dT.start()


# Every 24 hours, update Banweb Data CSVs
# Doesn't require input parameters
# No returns
def updateBanweb():
    while True:
        CollectData.collectData()
        time.sleep(24*60*60)
uT=threading.Thread(target=updateBanweb)
uT.start()


# Properly joining and closing 
# separate threads on shutdown
def cleanup():
    t = threading.enumerate()
    for thread in t:
        if thread is not threading.current_thread():
            thread.join()
atexit.register(cleanup) # only cleanup threads on shutdown


# Python Boilerplate
if __name__ == "__main__":
    from Controllers.requestController import bluePrint
    app.register_blueprint(bluePrint, url_prefix="/api")
    app.run()