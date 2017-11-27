dispatch.on("load.pieChart", function(data){
  // set height and width
  var width = 450,
      height = 450,
      radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
     .range(['#aec7e8','#ffbb78','#98df8a'])
     .domain("Oct 20 2012", "Oct 21 2012", "Oct 22 2012");
  var tooltip = floatingTooltip('date_tooltip', 240);
     

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.values; });

  var svg = d3.select("#pie").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "pieChart")
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


  var path = svg.datum(data).selectAll("path")
      .data(pie)
    .enter().append("path")
      .attr("fill", function(d, i) { return color(i); })
      .attr('stroke', function (d,i) { return d3.rgb(color(i)).darker(); })
      .attr('stroke-width', 3)
      .attr("d", arc)
      .each(function(d) { this._current = d; })
      .on('mouseover', function(d){ showDetail(d.data, tooltip)})
      .on('mouseout', function(d,i){ hideDetail(d.data, i, tooltip)});; // store the initial angles


    // now call for when station is selected
    dispatch.on("stateChange.pieChart", function(stationName){
      d3.csv("data/barAndPie.csv", function(error,data){
        if(error) throw error;
        var allStationData = selectStation(data);
        //filter through all stations to get the one that was just clicked on
        var newData = allStationData.filter(function(d) {
          return d.key === stationName;
        })[0].values; 

      path = path.data(pie(newData));
      path.transition().duration(500).attrTween("d", arcTween); 
      
      });//end csv
    });//end update dispatch 
    
    //Used for transitioning arcs 
    //Support from https://bl.ocks.org/mbostock/1346410
    function arcTween(a) {
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function(t) {
        return arc(i(t));
      };
    }
  });


  //Show tooltip
  //Called on mouse enter
  function showDetail(d,tooltip) {
    var content = '<span class="name">Date: </span><span class="value">' +
                  d.key +
                  '</span><br/>' +
                  '<span class="name">Number of rentals started: </span><span class="value">' +
                  d.values +
                  '</span><br/>';
    tooltip.showTooltip(content, d3.event);
  }
  
  //Hide tooltip
  //Called on mouse leave
  function hideDetail(d,i,tooltip) {
    tooltip.hideTooltip();
  }


  //don't delete this!
  function type(d){
  	d.values = +d.values;
  	return d;
  } 





