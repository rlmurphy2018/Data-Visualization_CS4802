# Get this figure: fig = py.get_figure("https://plot.ly/~rtm5151/49/")
# Get this figure's data: data = py.get_figure("https://plot.ly/~rtm5151/49/").get_data()
# Add data to this figure: py.plot(Data([Scatter(x=[1, 2], y=[2, 3])]), filename ="Plot 49", fileopt="extend")
# Get y data of first trace: y1 = py.get_figure("https://plot.ly/~rtm5151/49/").get_data()[0]["y"]

# Get figure documentation: https://plot.ly/python/get-requests/
# Add data documentation: https://plot.ly/python/file-options/

# If you're using unicode in your file, you may need to specify the encoding.
# You can reproduce this figure in Python with the following code!

# Learn about API authentication here: https://plot.ly/python/getting-started
# Find your api_key here: https://plot.ly/settings/api

import plotly.plotly as py
from plotly.graph_objs import *
import pandas as pd
import numpy as np


#read csv
df = pd.read_csv('cars-sample.csv')

py.sign_in('rtm5151', 'BBtyby2FugITT2qYi7hp')

def getTrace(mfg_name,mfg_color):
    x=df['Weight'][df['Manufacturer'] == mfg_name]
    y=df['MPG'][df['Manufacturer'] == mfg_name]
    size=x
    mfg=df['Manufacturer'][df['Manufacturer'] == mfg_name]
    
    trace = {
      "x": x, 
      "y": y, 
      "marker": {
        "color": mfg_color, 
        "size": size,  
        "sizemode": "area", 
        "sizeref": 24.53, 
        "sizesrc": "rtm5151:0:UBKBLWDYA179RLW3TANXIPXJDFNESCYK"
      }, 
      "mode": "markers", 
      "name": mfg_name.upper(), 
      "opacity": 0.5, 
      "showlegend": True, 
#       "textsrc": "rtm5151:0:BRPXRLEZJQCYZ8718YN1EG1P7OJ6ICXS", 
      "type": "scatter", 
#       "uid": "01a1e6", 
#       "xsrc": "rtm5151:0:UBKBLWDYA179RLW3TANXIPXJDFNESCYK", 
#       "ysrc": "rtm5151:0:53Z79B9I6HQ0UPEXSAGT368DDE9A1H3G"
    }
    return trace

trace1=getTrace('ford','rgb(255, 0, 0)')
trace2=getTrace('toyota','rgb(0, 255, 0)')
trace3=getTrace('honda','rgb(0, 0, 255)')
trace4=getTrace('bmw','rgb(255, 0, 255)')
trace5=getTrace('mercedes','rgb(0,255, 255)')

data = Data([trace1,trace2,trace3,trace4,trace5])
layout = {
  "autosize": True, 
  "hovermode": "closest", 
  "showlegend": True, 
  "title": "Python Plotly Package", 
  "xaxis": {
    "autorange": False, 
    "range": [1393.6938467, 5152.03538362], 
    "showline": True, 
    "ticks": [2000,3000,4000,5000], 
    "title": "Weight", 
    "type": "linear"
  }, 
  "yaxis": {
    "autorange": False, 
    "range": [7.06562724741, 50], 
    "showline": True, 
    "ticks": [10,20,30,40,50], 
    "title": "MPG", 
    "type": "linear"
  }
}
fig = Figure(data=data, layout=layout)
plot_url = py.plot(fig)