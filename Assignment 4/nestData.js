 function allStations(parsedData) {
    var monthNames = ["Jan", "Feb", "March", "April", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    //BAR CHARTS
    // nested by date as the key and value as the occurances/activity on that date -- same as the above startActivity
    var allStationActivity = d3.nest()
      .key(function(d) {
        var longDate = new Date(d.start_date);
        var day = longDate.getUTCDate();
        var month = monthNames[longDate.getMonth()];
        var year = longDate.getFullYear();
        var date = month + " " + day + " " + year;
        return date;})
      .rollup(function(v) {return v.length;})
      .entries(parsedData);
    return allStationActivity;
}



  function selectStation(parsedData){
    // nested as station name as the key and the values are keys for dates and values for occurrances on that date and at that station
    var monthNames = ["Jan", "Feb", "March", "April", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var selectStationActivity= d3.nest()
      .key(function(d) {return d.start_station_name})
      .key(function(d) {
        var longDate = new Date(d.start_date);
        var day = longDate.getUTCDate();
        var month = monthNames[longDate.getMonth()];
        var year = longDate.getFullYear();
        var date = month + " " + day + " " + year;
        return date;})
      .rollup(function(v) {return v.length})
      .entries(parsedData);
    return selectStationActivity;
  }

  
  
