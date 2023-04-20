# Imports and Data
import sys, requests, json
sys.path.append("..")
from bs4 import BeautifulSoup


# DEBUG : SPRING IT TABLES ONLY
# runs a more limited collection and processing of Banweb Data
# No input parameters
# No returns, only file output
def Debug():
    with open('../conf.json', 'r') as config:
        conf = json.load(config)

    result = open("debug.csv", "w") # Open file io
    result.write(conf['csvHeader'] + "\n")
    data = { # Creating custom POST parameters to interact with Banweb since buttons don't work
        'P_TERM': "202330",
        'P_SUBJ': "IT",
    }

    raw = requests.post(conf['url'], data=data, verify=False) # get raw page html
    doc = BeautifulSoup(raw.content, "html5lib") # parse using html5lib
    page = doc.find_all("tr") # find all table row elements
    for section in page:
        temp=''
        course = section.find_all("td") # find all table data elements
        if len(course) > 2:
            for data in course: # parsing and cleaning element contents
                data = data.text.replace('\'', '').strip()
                temp += f'"{data}",' if len(data) else ','
            result.write(temp + "\n") # writing output
    result.close() # close file io
    exit(1)


Debug()