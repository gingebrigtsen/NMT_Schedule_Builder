# Imports and Data
import sys, requests
sys.path.append("..")


# DEBUG : RAW HTML OUTPUT
# Dumps the banweb course offerings landing screen for debugging
# No input parameters
# No returns, only file output
def Dump():
    result = open("dump.html", "wb") # Open file io
    raw = requests.get('https://banweb7.nmt.edu/pls/PROD/hwzkcrof.p_uncgslctcrsoff', verify=False) # get raw page html
    result.write(raw.content)
    result.close() # close file io
    exit(1)


Dump()