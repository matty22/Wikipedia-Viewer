function getQuery() {
	//Sets variable equal to users input in search box
	var searchQuery = $("#searchBox").val();
	//API call to wikipedia to return an object of objects for the query
	$.getJSON("http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=" + searchQuery + "&callback=?", function(json){
		document.getElementById("resultsTable").innerHTML = "";
		var returnedObj = json;
		
		//If search query does not exist, return error message.
		if (returnedObj.query === undefined) {
			document.getElementById("resultsTable").innerHTML = "<div class='resultsItem'>This search term does not exist in Wikipedia. Please alter your search.</div>";
		} else{
			//Parse out each result from the json and display each in a div row.
			var ObjArr = Object.keys(returnedObj.query.pages);
			
			for(var i = 0; i < ObjArr.length; i++) {
				document.getElementById("resultsTable").innerHTML += "<a href='https://en.wikipedia.org/wiki/" + returnedObj.query.pages[ObjArr[i]].title + "'><div class='resultsItem'>" + returnedObj.query.pages[ObjArr[i]].title + "</div></a>";
			}
		}
	});
}

//Navigates to random wikipedia when someone clicks the random button
document.getElementById("randomButton").onclick = function() {
	location.href = "http://en.wikipedia.org/wiki/Special:Random";
}

//Click event handler for search button clicks
$("#searchButton").click(function(){
    getQuery();
});

//Fires getQuery() function when someone hits enter key
$(document).keypress(function (e) {
    if (e.which == 13) {
        getQuery();
    }
});