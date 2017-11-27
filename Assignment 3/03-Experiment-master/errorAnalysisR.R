# Get this figure: fig <- get_figure("r1.murphy634", 3)
# Get this figure's data: data <- get_figure("r1.murphy634", 3)$data
# Add data to this figure: p <- add_trace(p, x=c(4, 5), y=c(4, 5), kwargs=list(filename="Plot 3", fileopt="extend"))
# Get y data of first trace: y1 <- get_figure("r1.murphy634", 3)$data[[1]]$y

# Get figure documentation: https://plot.ly/r/get-requests/
# Add data documentation: https://plot.ly/r/file-options/

# You can reproduce this figure in R with the following code!

# Learn about API authentication here: https://plot.ly/r/getting-started
# Find your api_key here: https://plot.ly/settings/api


library(plotly)
trace1 <- list(
  x = c("1.763", "2.431", "2.697"), 
  y = c("Bar Chart", "Pie Chart", "Radial Bar Chart"), 
  error_x = list(
    array = c(".483", "0.505", "0.515"), 
    arraysrc = "r1.murphy634:2:56ff70"
  ), 
  mode = "markers", 
  name = "Chart Type", 
  type = "scatter", 
  uid = "8d389c", 
  xsrc = "r1.murphy634:2:8111b3", 
  ysrc = "r1.murphy634:2:a4f92d"
)
data <- list(trace1)
layout <- list(
  autosize = TRUE, 
  dragmode = "pan", 
  hovermode = "closest", 
  title = "Experiment 3 Error Analysis", 
  xaxis = list(
    autorange = TRUE, 
    range = c(1.17266666667, 3.31933333333), 
    title = "<b>Log Error</b>", 
    type = "linear"
  ), 
  yaxis = list(
    autorange = TRUE, 
    range = c(-0.131080757249, 2.13108075725), 
    title = "<b>Chart Type</b>", 
    type = "category"
  )
)
p <- plot_ly()
p <- add_trace(p, x=trace1$x, y=trace1$y, error_x=trace1$error_x, mode=trace1$mode, name=trace1$name, type=trace1$type, uid=trace1$uid, xsrc=trace1$xsrc, ysrc=trace1$ysrc)
p <- layout(p, autosize=layout$autosize, dragmode=layout$dragmode, hovermode=layout$hovermode, title=layout$title, xaxis=layout$xaxis, yaxis=layout$yaxis)

