console.log("background running, currentState is "+localStorage.getItem("currentState"));

// if (localStorage.getItem("currentState") == "on") { 
// 	console.log("background registers currentSTate on");
// 	$.getScript("colormanip.js", function(){
// 		console.log("getScript executes")
// 		var images=$('img');
// 		fixPicsInDoc(images);
// 	});
// 	// replaceStyle()
// }

var images;
var values;
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	console.log("backgroundjs got message");
	console.log(message);
	console.log(typeof message);
	console.log(sender);

	if(message['method'] == 'getValues') {
		values = message['values'];
		sendResponse("Values received");
	} else if (message['method'] == 'sendValues') {
		sendResponse(values);
	}
});
/*if (localStorage.getItem("currentState") == "on") { 
	console.log("background registers currentState on");
	chrome.tabs.query({ url: "<all_urls>"}, function(tabs)
	{
	   $.getScript("colormanip.js", function(){
	    for(var i = 0; i < tabs.length; i++)
	    {
	        chrome.tabs.executeScript(tabs[i].id, 
	        	{ file: "colormanip.js" }, function(){
	        		console.log("getScript executes")
					var images=$('img');
					fixPicsInDoc(images);
	        	});
	    }
	   });
	});
}*/
