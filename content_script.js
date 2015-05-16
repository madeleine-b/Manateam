console.log("reaching content script");

//Adds a listener to Chrome local storage that is called when 
//the values of checkbox, any color swatch, or any tolerance is changed
//Then it runs fixPicsInDoc if "Color Schemed" is checked
chrome.storage.onChanged.addListener(function(changes, namespace) {
	chrome.storage.local.get("currentState", function(items) {
	  var cbState = items["currentState"];
	  if (cbState == "on") {
	  	console.log("Checkbox has been changed to on so we're going to turn on/update colorscheming");
	  	fixPicsInDoc();
	  } else if ("currentState" in changes) {
	  	console.log("Check box has been changed to off, so we need to turn OFF colorscheming now");
	  	replaceOriginalImages();
	  }
  });
});
