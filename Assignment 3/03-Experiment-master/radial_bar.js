function generateRadial(){
    var width = 350;
    var height = 350;
    var transformWidth = width/2;
    var transformHeight = height/2;
    var outer = 150;
    var inner = 75;
    var data = [];
    var comparisons = [];
    var markedArcs= 0;

    
    for(i=0; i<10; i++){
        data.push(Math.floor((Math.random() * 100) + 5));
    }

    var numPieces = data.length;

    //select index from options array, then remove as an option so we don't have duplicates
    var options = [0,1,2,3,4,5,6,7,8,9];
    var firstIndex = Math.floor(Math.random()*9)
    comparisons.push(data[options[firstIndex]]);
    options.splice(firstIndex, 1);
    var secondIndex = Math.floor(Math.random()*8)
    comparisons.push(data[options[secondIndex]]);

    //calculate percentage 
    var largest = Math.max.apply(Math, comparisons);
    var smallest = Math.min.apply(Math, comparisons);
    var actualPercentage = (smallest/largest) * 100;

    var svg = d3.select("#radial").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + transformWidth + "," + transformHeight + ")");

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) {
            return d;
        });

    for (var i = 0; i < data.length; i++ ){
      var arc = d3.svg.arc()
        .startAngle( (i * 2 * Math.PI) / numPieces)
        .endAngle(((i + 1) * 2 * Math.PI) / numPieces)
        .innerRadius(inner)
        .outerRadius(inner + (data[i] * outer)/175);
      svg.append("path")
        .attr("d", arc)
        .attr("stroke", "white")
        .attr("fill", "black")
        .attr("stroke-width", 2);
        
       //Check to see if the current data value is one of the two comparison values. If we have duplicate values, make sure we only mark 2 of the arcs 
      if ((comparisons.includes(data[i])) && (markedArcs < 2)) {
        svg.append("circle")
             .attr("r", 4)
             .style("fill", "red")
             .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; });
        markedArcs++;
      }
    }

    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "radialActual");
    input.setAttribute("value", Math.round(actualPercentage * 100) / 100);
    document.getElementById("lab3").appendChild(input);
  }
