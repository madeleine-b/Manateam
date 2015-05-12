console.log("background running");

//Runs fixPicsInDoc() initially on page load iff Color Schemed checkbox is checked
chrome.storage.local.get("currentState", function(items) {
  	var cbState = items["currentState"];
  	if (cbState == "on") {
  		console.log("Checkbox is on so we're gonna do an initial colorscheming");
  		fixPicsInDoc();
  	}
  });