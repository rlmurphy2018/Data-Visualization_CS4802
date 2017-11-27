
# coding: utf-8

# In[2]:

#
# Rachel Murphy
# Language: Python 3.x; Libraries: matplotlib.pyplot, numpy
#

import matplotlib.pyplot as plt
import numpy as np

# Read in data to numpy
durl = 'cars-sample.csv'
rdata = np.genfromtxt(durl,dtype='S3,S25,S25,f,f,f,f,f,f,i,S25',delimiter=',',names=True)

x = rdata['Weight']
y = rdata['MPG']
color = []
area = []

#Dictionary of colors for the manufacturers
mcolor={'bmw':'b','ford':'r','honda':'g','mercedes':'m','toyota':'c'}

#populate size and color arrays
for data in rdata:
    color.append(mcolor.get(data['Manufacturer'].decode('UTF-8').strip('"'),"y"))
    area.append(data['Weight']*.05)

#Create scatter plot
plt.scatter(x, y, c=color, s=area, alpha=0.5 )

#set required tick marks
plt.xticks([2000,3000,4000,5000])
plt.yticks([10,20,30,40])

#adjust axis ranges as required
plt.axis([1600,5400,8,50])

#set axis labels
plt.xlabel('Weight')
plt.ylabel('MPG')

#add grid
plt.grid(True)

plt.show()

