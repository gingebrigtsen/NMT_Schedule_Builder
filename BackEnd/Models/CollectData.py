# Imports and Data
import sys, requests, json
sys.path.append("..")
from bs4 import BeautifulSoup
from ParseData import parseData


# Scraping Banweb Content
# Iteratively collects data from all relevant public banweb course offerings
# No inputs
# No returns, only file output
def collectData():
    # configuration data
    with open('conf.json', 'r') as config:
        conf = json.load(config)

    # iterating thru valid terms to collect data
    for term in conf['p_term']:
        result = open("./csv/" + term[0] + ".csv", "w") # Open file io
        result.write(conf['csvHeader'] + "\n")
        for dept in conf['p_subj']:
            # Creating custom POST parameters to interact with Banweb
            data = {
                'P_TERM': term[1],
                'P_SUBJ': dept[1],
            }
            
            # Scraping banweb pages
            raw = requests.post(conf['url'], data=data, verify=False) # get raw page html
            doc = BeautifulSoup(raw.content, "html5lib") # parse using html5lib
            page = doc.find_all("tr") # find all table row elements

            # organization and cleanup
            for section in page:
                temp=''
                course = section.find_all("td") # find all table data elements
                if len(course) > 2:
                    # cleaning element contents
                    for data in course:
                        data = data.text.replace('\'', '').strip()
                        temp += f'"{data}",' if len(data) else ','
                    result.write(temp + "\n") # writing output
        result.close() # close file io
        # parsing generated csv file
        parseData(("./csv/" + term[0] + ".csv"), ("./csv/" + term[0] + "P.csv"))


collectData()


# DEBUG & Boilerplate
sys.stderr = open('./misc/log', 'w')