function generatePie(){
    var data = [];
    var comparisons = [];// array of the 2 data values selected to be compared
    var comparisonArcs = []; // array of location of the 2 data values to be compared
    var height = 300;
    var width = 300;
    var radius = 150;

    //generate the random data points for data array
    for(i=0; i<10; i++){
        data.push(Math.floor(Math.random() * 100) + 1);
    }

    //generate 2 UNIQUE values from the data array for comparison
    var options = [0,1,2,3,4,5,6,7,8,9];
    var firstIndex = Math.floor(Math.random()*9)
    comparisons.push(data[options[firstIndex]]); 
    comparisonArcs.push(options[firstIndex]); 
    options.splice(firstIndex, 1);

    var secondIndex = Math.floor(Math.random()*8)
    comparisons.push(data[options[secondIndex]]);
    comparisonArcs.push(options[secondIndex]);

    //calculate percentage 
    var largest = Math.max.apply(Math, comparisons);
    var smallest = Math.min.apply(Math, comparisons);
    var actualPercentage = (smallest/largest) * 100;

    // create the svg
    var svg = d3.select("#pie").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // outer circle of the pie chart
     var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(0);

    // generates the pie chart
    var pie = d3.layout.pie()
            .sort(null)
            .value(function (d) {return d;});

	//divide the pie chart into 10 separate arcs based on the generated data
	var g = svg.selectAll("g").data(pie(data)).enter()
	            .append("g")
	            .attr("class",function(d,i) {
	                return "arc"+i;
	            })
	            .attr("fill", "black");

	var paths = g.append("path")
	    .attr("d", arc)
	    .attr("stroke", "white") 
	    .attr("stroke-width", "2px")
	    .attr("class", function(d, i) {
	        return "arc"+i
	});

	//get arc using class
	var arcSelector0 = ".arc"+comparisonArcs[0];
	var arcSelector1 = ".arc"+comparisonArcs[1];

	//draw circles for two arcs
	var circle0 = d3.select(arcSelector0)
        .append("circle")
        .attr("r",4)
        .attr("transform", function(d){
            return "translate(" + arc.centroid(d) + ")";})
        .attr("fill","red");
	var circle1 = d3.select(arcSelector1)
	    .append("circle")
	    .attr("r",4)
	    .attr("transform", function(d){
	        return "translate(" + arc.centroid(d) + ")";})
	    .attr("fill","red");

	//Append actual values to form so we can parse later by selecting all inputs
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "pieActual");
    input.setAttribute("value", Math.round(actualPercentage * 100) / 100);
    document.getElementById("lab3").appendChild(input); 

}