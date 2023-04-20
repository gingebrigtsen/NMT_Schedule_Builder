# Imports and Data
import datetime, fitz, json, re, requests, sys
sys.path.append("..")
import pandas as pd
from bs4 import BeautifulSoup


# WORK IN PROGRESS
# Get single banweb entry from csv storage
# takes CRN id, term parameters
# returns json/dict course data
def getById(id, term):
    data = pd.read_csv("Models/"+term+".csv")
    target = data.loc[data["CRN"] == id]
    if len(target) == 0:
        raise ValueError(f"No row found with CRN {id}.")
    else:
        return target.iloc[0].to_dict()
    

# Gets banweb data by query from csv
# returns relevant course data
def getByQuery(query, sortBy, order):
    # Parse the CSV
    with open('', 'r') as csv:
        r = csv.DictReader(csv)
        data = list(r)

    # Filter, sort, and return relevant data
    if query:
        data = [d for d in data if query in d.values()]
    data = sorted(data, key=lambda d: d[sortBy], reverse=order == 'desc')
    return data
# END WORK IN PROGRESS


# SERVICES: backend functions
# Collecting new subject codes from banweb
# Takes in raw html from dateCheck(), updates p_subj in config
# No returns, only file output
def psubj(raw):
    doc = BeautifulSoup(raw.content, "html5lib") # parse the page
    # extract subj codes from select element
    subjCodes = [[option.text, option['value']] for option in doc.select('select[name=p_subj] option')]
    # update the json configuration file
    with open ('Models/conf.json', 'r') as fin:
        conf = json.load(fin)
    conf['p_subj'] = subjCodes
    with open ('Models/conf.json', 'w') as fout:
        json.dump(conf, fout)


# Collecting new term codes from banweb
# Takes in raw html from dateCheck(), and the current year
# No returns,  only file output
def pterm(raw, term):
    doc = BeautifulSoup(raw.content, "html5lib") # parse using html5lib
    # extract term codes from relevant years
    termCodes = [[option.text, option['value']] for option in doc.select('select[name=p_term] option') if str(term) in option.text]
    # update the json configuration file
    with open('Models/conf.json', 'r') as fin:
        conf = json.load(fin)
    conf['p_term'] += termCodes
    with open('Models/conf.json', 'w') as fout:        
        json.dump(conf, fout)
    psubj(raw)


# Date Checking: checking banweb if new codes are available
# No input parameters
# No returns
def dateCheck():
    raw = requests.get('https://banweb7.nmt.edu/pls/PROD/hwzkcrof.p_uncgslctcrsoff', verify=False) # getting raw html
    today = datetime.date.today() # finding today's date
    year = today.year # finding today's date
    date_regex = r'\w+ \d{1,2}, (\d{4})' # pattern to match date "Month dd, yyyy"
    date_pattern = re.compile(date_regex) # compiling pattern for efficiency
    term_regex = r"(Fall|Summer|Spring)\s\d{4}" # pattern to match term title
    term_pattern = re.compile(term_regex) # compiling pattern for efficiency

    # Find pattern in site, extract and compare to today's date to determine
    # whether or not to collect new term codes with pterm()
    for element in BeautifulSoup(raw.content, "html5lib").find_all():
        date_match = date_pattern.search(element.text)
        if date_match:
            term_match = term_pattern.search(element.text)
            if term_match:
                term = term_match.group(0)
                date = datetime.datetime.strptime(date_match.group(0), '%B %d, %Y').date()
                if date <= today:
                    pterm(raw, term)
# END SERVICES


# DEBUG & Boilerplate
sys.stderr = open('./misc/log', 'w')
if len(sys.argv) >= 2:
    method_name = sys.argv[1]
    method = globals().get(method_name)
    if callable(method):
        method()
    else:
        print("Method not found")
else:
    print("No method name provided")