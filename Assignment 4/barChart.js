
dispatch.on("load.barChart", function(data) { // this bracket should end at the very end of this file
// now that data exists -- create a bar chart
 var margin = {top: 20, right: 20, bottom: 100, left: 40},
    width = 500 - margin.left- margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x) 
    .orient("bottom")

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(8);

var svg = d3.select("#bar")
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + (margin.left + 10) + "," + margin.top + ")");
    
  x.domain(data.map(function(d) { return d.key; }));
  y.domain([0, d3.max(data, function(d) { return d.values; })]);

  svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "yaxis")
      .call(yAxis);

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .style("fill", "steelblue")
      .attr('stroke', function (d) { return d3.rgb("steelblue").darker(); })
      .attr('stroke-width', 3)
      .attr("x", function(d) {return x (d.key); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) {; return y (d.values)})
      .attr("height", function(d) {return height - y(d.values); });

// now call for when station is selected
dispatch.on("stateChange.bar", function(stationName){
  d3.csv("data/barAndPie.csv", function(error,data){
    if(error) throw error;
    var allStationData = selectStation(data);
    var newData = allStationData.filter(function(d) {
      return d.key === stationName;
    })[0].values;
    console.log(newData);

    // rescale the bar chart 
    // possibly change the selectedStationActivity to newData??
    x.domain(newData.map(function(d) { return d.key; }));
    y.domain([0, d3.max(newData, function(d) { return d.values; })]);

    // change the bars
    svg.selectAll(".bar")
          .data(newData) // this part needs to change???
        .transition()
         .duration(500)
         .attr("x", function(d) {return x (d.key); })
         .attr("width", x.rangeBand())
         .attr("y", function(d) { return y(d.values); })
         .attr("height", function(d) { return height - y(d.values);});

    svg.select(".xaxis")
      .transition()
      .duration(500)
      .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

    svg.select(".yaxis")
      .transition()
      .duration(500)
      .call(yAxis)
    }); //end csv 
  }); //end dispatch 
}); // this bracket should match up with the very first line


  