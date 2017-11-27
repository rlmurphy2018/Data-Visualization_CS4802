/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 *
 * Organization and style inspired by:
 * https://bost.ocks.org/mike/chart/
 *
 */
function bubbleChart() {
  // Constants for sizing
  var width = 450;
  var height = 550;  

  // tooltip for mouseover functionality
  var tooltip = floatingTooltip('station_tooltip', 240);

  // Locations to move bubbles towards
  var center = { x: width / 2, y: height / 2 };

  // Used when setting up force 
  var damper = 0.102;
  var svg = null;
  var legend = null;
  var bubbles = null;
  var nodes = [];

  //legend color rectangles and spacing
  var legendRectSize = 16;
  var legendSpacing = 4;

  // Charge is negative because we want nodes to repel.
  // Dividing by 8 scales down the charge to be
  // appropriate for the visualization dimensions.
  function charge(d) {
    return -Math.pow(d.radius, 2.0) / 8;
  }
  var force = d3.layout.force()
    .size([width, height])
    .charge(charge)
    .gravity(-0.01)
    .friction(0.9);
  // Color based on municipality where hubway station located
  var fillColor = d3.scale.category10()
    .domain(['Boston', 'Somerville', 'Brookline', 'Cambridge']);
  // Sizes bubbles based on their area instead of raw radius
  var radiusScale = d3.scale.pow()
    .exponent(0.5)
    .range([2, 36]);
  //Parse CSV data
  function createBubbleNodes(rawData) {
    var myNodes = rawData.map(function (d) {
      return {
        radius: radiusScale(+d.count),
        count: +d.count, 
        value: d.count,
        name: d.station_name,
        group: d.loc,
        x: Math.random() * 900,
        y: Math.random() * 800
      };
    });
    myNodes.sort(function (a, b) { return b.value - a.value; });
    return myNodes;
  }
  
  var chart = function chart(selector, rawData) {
    var maxAmount = d3.max(rawData, function (d) { return +d.count; });
    radiusScale.domain([0, maxAmount]);
    nodes = createBubbleNodes(rawData);
    force.nodes(nodes);
    svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    legend = svg.selectAll('.legend')
      .data(fillColor.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function(d, i) {
          var horz = 100*i + 5;                     
          var vert = height -20;                        
          return 'translate(' + horz + ',' + vert + ')'; 
          });                                 

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', fillColor)
      .style('stroke', fillColor);

    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function(d) { return d; });

    // Bind nodes data to what will become DOM elements to represent them.
    bubbles = svg.selectAll('.bubble')
      .data(nodes);
    //r set to 0 then changed using transition function 
    //showDetail and hideDetail for tooltips
    bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('fill', function (d) { return fillColor(d.group); })
      .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); })
      .attr('stroke-width', 2)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail)
      .on("click", function clicked(d) {
        // d is the clicked bubble
        dispatch.stateChange(d.name);
      }); 
    bubbles.transition()
      .duration(2000)
      .attr('r', function (d) {return d.radius; });
    groupBubbles();
  };
  //move bubbles
  function groupBubbles() {  
    force.on('tick', function (e) {
      bubbles.each(moveToCenter(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
    });
    force.start();
  }
  //helper
  function moveToCenter(alpha) {
    return function (d) {
      d.x = d.x + (center.x - d.x) * damper * alpha;
      d.y = d.y + (center.y - d.y) * damper * alpha;
    };
  }
  //show tooltip
  function showDetail(d) {
    d3.select(this).attr('stroke', 'black');
    var content = '<span class="name">Station: </span><span class="value">' +
                  d.name +
                  '</span><br/>' +
                  '<span class="name">Amount: </span><span class="value">' +
                  d.value +
                  '</span><br/>';
    tooltip.showTooltip(content, d3.event);
  }
  //hide tooltip
  function hideDetail(d) {
    // reset outline
    d3.select(this)
      .attr('stroke', d3.rgb(fillColor(d.group)).darker());
    tooltip.hideTooltip();
  }
  // return the chart function from closure.
  return chart;
}//end bubbleChart
  
//initialize for display function call
var myBubbleChart = bubbleChart();

//call after CSV is loaded 
function display(error, data) {
  if (error) {
    console.log(error);
  }
  myBubbleChart('#bubble', data);
}

// Load the data.
d3.csv('data/bubble1.csv', display);
