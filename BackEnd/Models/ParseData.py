# Imports and Data
import csv, sys
sys.path.append("..")


# Parsing Banweb Content
# Removing broken lines, consolidating data
# Input parameters are source and destination csv files
# No returns, only file output
def parseData(src, dest):
    # opening input (unparsed) and output (destination) CSV files
    with open(src, 'r') as inF, open(dest, 'w') as outF:
        r = csv.reader(inF)
        w = csv.writer(outF, quoting=csv.QUOTE_ALL)
        buf = None
        
        # moving line to line
        for l in r:
            # use line number to skip parsing the header
            if r.line_num == 1:
                w.writerow(l)
                continue
            
            # replace broken bookstore link with catalog url
            # eg "https://catalog.nmt.edu/courses/DEPT1234"
            url = l[1].replace(' ', '').split('-')[0]
            if url and url[-1] == 'L':
                url = url[:-1]
            l[16] = "https://catalog.nmt.edu/courses/" + url

            # removing unknown scraps remaining after url
            if l[17]:
                del l[17]
            
            # if it's an average CSV row
            # directly write it to output
            if l[0] != '':
                if buf is not None:
                    w.writerow(buf) # write to output
                buf = l
            
            # if it's a second instructor line
            # concatenate instructor to the previous line
            # then write to output
            elif l[0] == '' and l[10] != '':
                buf[10]+=' & '+l[10] # add instructor to previous course
            
            # if it's an otherwise broken entry
            # keep existing information, fix missing by cloning from prev row
            # then write to output
            else:
                for i, c in enumerate(l):
                    if c == '':
                        l[i] = buf[i] # fix it using the course it's attached to
                w.writerow(l) # write to output
        w.writerow(buf) # clear buffer


# DEBUG & Error Logging
#sys.stderr = open('./Models/misc/log', 'a')