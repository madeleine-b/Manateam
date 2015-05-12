
console.log("reaching content script");

//var DOMImages = $("img").toArray();
//console.log(DOMImages);

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ("currentState" in changes) {
      chrome.storage.local.get("currentState", function(items) {
      	var cbState = items["currentState"];
      	if (cbState == "on") {
      		fixPicsInDoc();
      	} else {
      		console.log("Check box has been changed, but we need to turn OFF colorscheming now");
      	}
      });
    }
});