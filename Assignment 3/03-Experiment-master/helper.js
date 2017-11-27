// keeps count of number of trials and page number
//3 graphs per page = 20 pages total
var trialRecords = [];
var pageNum= 1;

//randomly place divs on page
//Help from http://jsfiddle.net/BwJHj/1/
function randomizeDivs(){
	var visualizations = $(".vis");
	for(var i = 0; i < visualizations.length; i++){
	    var target = Math.floor(Math.random() * visualizations.length -1) + 1;
	    var target2 = Math.floor(Math.random() * visualizations.length -1) +1;
	    visualizations.eq(target).before(visualizations.eq(target2));
	}
}

//make sure divs and form are empty and generate graphs
function populateVis(){
	$("#pie").html("");
	$("#bar").html("");
	$("#radial").html("");
	$("#lab3").trigger("reset");
	generatePie();
	generateBar();
	generateRadial();
}


function makeRecord(participantId){
	//get all user inputs and create key,value pairs
	var $inputs = $('#lab3 :input');
	var values = {};
	//append user id to record
    values["id"] = participantId;
    values["pageNum"] = pageNum;
    //append user inputs and actual percentages to values
    $inputs.each(function() {
    	if(this.name != ""){
    		values[this.name] = $(this).val();
    	}
    });
    trialRecords.push(values);

}

function updatePageNum(){
	// increase page number and keep next button visible
	if(pageNum < 19){
		pageNum++;
		$("#trialNum").text(pageNum);
	}
	// switch button visibility - so submit button is available
	else{
		pageNum++;
		$("#trialNum").text(pageNum);
		$("#next").toggle();
		$("#submit").toggle();
	}
}

function printAllRecords(){

	$("#form").empty();

	$("#form").html("<table id='records'>");
	var $headerRow = $('<tr>').append(
		$('<td>').text("User ID"),
		$('<td>').text("Page #"),
		$('<td>').text("Bar Reported"),
		$('<td>').text("Bar Actual"),
		$('<td>').text("Pie Reported"),
		$('<td>').text("Pie Actual"),
		$('<td>').text("Radial Reported"),
		$('<td>').text("Radial Actual"),
		$('</tr>')
		).appendTo('#records');


	trialRecords.forEach(function(e){
	var $tr = $('<tr>').append(
        $('<td>').text(e.id),
        $('<td>').text(e.pageNum),
		$('<td>').text(e.barGuess),
		$('<td>').text(e.barActual),
		$('<td>').text(e.pieGuess),
		$('<td>').text(e.pieActual),
		$('<td>').text(e.radialGuess),
		$('<td>').text(e.radialActual),
		$('</tr>')
		).appendTo('#records');
	});

}
