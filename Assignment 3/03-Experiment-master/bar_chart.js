
function generateBar(){
    var data = [];
    var comparisons = [];
    var height = 300;
    var width = 350; 
    var padding = 5;
    var barWidth = 35;
    var newVal;

    for(i=0; i<10; i++){
        data.push(Math.floor(Math.random() * 100) + 1);
    }

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

    //create svg space
    var svg = d3.select("#bar")
            .append("svg:svg")
            .attr("height",height)
            .attr("width",width);

    //make rectangle based on (0-100) values. Multiply by a magnitude of 3 so that smaller values are actually visible. 
    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .attr("x", function(d, i){
            return i * barWidth + padding; 
        })
        .attr("y", function(d){ return height - d * 3})
        .attr("width", barWidth - padding)
        .attr("height", function(d) {return d * 3; });

    //create and append blank axis 
    var x = d3.scale.ordinal().rangeRoundBands([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    svg.append("g")
      .attr("class", "y axis")
      .attr("stroke", "black")
      .attr("stroke-width", "3px")
      .call(yAxis);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .attr("stroke", "black")
      .attr("stroke-width", "3px")
      .call(xAxis);

    //cycle through the two comparison values, which are the actual (0-100) value at a given index (0-9) in the data array. 
    //Use data.indexOf to find out how many bars over the corresponding rectangle is and use the (0-100) value to set height
    //Center in rectangle using barwidth and padding as manipulation
    for(i=0; i<2; i++){
        var index = data.indexOf(comparisons[i]);
        svg.append("circle")
        .attr("cx", index * barWidth + ((barWidth - padding)/2 ) + 3)  
        .attr('cy', height - comparisons[i]/2 *3)
        .attr('r', 4)
        .attr("fill","red");
    }

    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "barActual");
    input.setAttribute("value", Math.round(actualPercentage * 100) / 100);
    document.getElementById("lab3").appendChild(input);
}



