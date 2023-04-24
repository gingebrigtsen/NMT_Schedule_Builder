# Imports and Data
import datetime, json, re, requests, sys
sys.path.append("..")
from bs4 import BeautifulSoup


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


# DEBUG & Error Logging
sys.stderr = open('./Services/misc/log', 'a')