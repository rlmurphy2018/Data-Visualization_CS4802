
# coding: utf-8

# In[ ]:

get_ipython().magic('matplotlib inline')
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

#read csv
df = pd.read_csv('cars-sample.csv')

# Create a figure
plt.figure(figsize=(10,8))

def getMfg(mfg_name,mfg_color):
    plt.scatter(df['Weight'][df['Manufacturer'] == mfg_name.lower()],
                # MPG as the y axis
                df['MPG'][df['Manufacturer'] == mfg_name.lower()],
                # the marker as
                marker='o',
                # the color blue
                color=mfg_color.title(),
                # the alpha / opacity
                alpha=0.5,
                # with size
                s = df['Weight']*.03,
                # labelled this
                label=mfg_name.title())    
    

getMfg('ford','r')
getMfg('toyota','g')
getMfg('bmw','b')
getMfg('honda','c')
getMfg('mercedes','m')


# Chart title
plt.title('Python')

# y label
plt.ylabel('MPG')

# x label
plt.xlabel('Weight')

# and a legend
plt.legend(loc='upper right')

# set the figure boundaries
plt.xlim([min(df['Weight']-100), max(df['Weight'])+200])
plt.ylim([min(df['MPG']-4), max(df['MPG'])])
plt.xticks([2000,3000,4000,5000])
plt.yticks([10,20,30,40,50])
plt.grid()
plt.show()

