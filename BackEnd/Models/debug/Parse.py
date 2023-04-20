# Imports and Data
import csv, sys
sys.path.append("..")


# DEBUG: Fixing Banweb Contents
# Removing broken lines, consolidating data, more limited than parseData()
# No input parameters
# No returns, only file output
def Parse():
    with open('debug.csv', 'r') as inF, open('parsed.csv', 'w') as outF:
        r = csv.reader(inF)
        w = csv.writer(outF, quoting=csv.QUOTE_ALL)
        buf = None
        
        for l in r:
            # use line number to skip parsing the header
            if r.line_num == 1:
                w.writerow(l)
                continue
            
            # replace the bookstore link with catalog url
            # eg "https://catalog.nmt.edu/courses/DEPT1234"
            url = l[1].replace(' ', '').split('-')[0]
            if url and url[-1] == 'L':
                url = url[:-1]
            l[16] = "https://catalog.nmt.edu/courses/" + url

            # removing anything remaining after url
            if l[17]:
                del l[17]

            if l[0] != '':
                if buf is not None:
                    w.writerow(buf)
                buf = l
            elif l[0] == '' and l[10] != '': # if it's a second instructor line
                buf[10]+=' & '+l[10]
            else:
                for i, c in enumerate(l):
                    if c == '':
                        l[i] = buf[i]
                w.writerow(l)
        w.writerow(buf)


Parse()