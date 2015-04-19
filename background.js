// localStorage.setItem("currentState","on");

function init() {

  var colorIn = document.getElementById("ColorIn");
  var colorInRange = document.getElementById("ColorInRange");
  var colorOut = document.getElementById("ColorOut");
  var colorOutRange = document.getElementById("ColorOutRange");


  colorIn.addEventListener("input",function() {outputUpdate(colorIn.value,1);});
  colorInRange.addEventListener("input",function() {outputUpdate(colorInRange.value,2);});
  colorOut.addEventListener('input',function() {outputUpdate(colorOut.value,3);});
  colorOutRange.addEventListener('input',function() {outputUpdate(colorOutRange.value,4);});

  if (localStorage.getItem("currentState")!="undefined") {
    cb.checked = (localStorage.getItem("currentState")=="on" ? true : false);
  } else {
    cb.checked = false;
  }

  colorIn.value = (typeof localStorage.getItem("gColorIn")!="undefined" ? localStorage.getItem("gColorIn") : "#ff0000");
  colorInRange.value = (typeof localStorage.getItem("tolIn")!="undefined" ? localStorage.getItem("tolIn") : "100");
  colorOut.value = (typeof localStorage.getItem("gColorOut")!="undefined" ? localStorage.getItem("gColorOut") : "#ff0000");
  colorOutRange.value = (typeof localStorage.getItem("tolOut")!="undefined" ? localStorage.getItem("tolOut") : "100");

/*
var images;
=======
var values;
>>>>>>> scriptstuff
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
});*/
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
}

window.addEventListener('DOMContentLoaded', function() {init();});

console.log("background running, currentState is "+localStorage.getItem("currentState"));

if (localStorage.getItem("currentState") == "on") { 
	console.log("background registers currentSTate on");
	$.getScript("colormanip.js", function(){
		console.log("getScript executes")
		var images=$('img');
		fixPicsInDoc(images);
	});
	// replaceStyle()
}


// if (localStorage.getItem("currentState") == "on") { 
// 	console.log("background registers currentState on");
// 	chrome.tabs.query({ url: "<all_urls>"}, function(tabs)
// 	{
// 	   $.getScript("colormanip.js", function(){
// 	    for(var i = 0; i < tabs.length; i++)
// 	    {
// 	        chrome.tabs.executeScript(tabs[i].id, 
// 	        	{ file: "colormanip.js" }, function(){
// 	        		console.log("getScript executes")
// 					var images=$('img');
// 					fixPicsInDoc(images);
// 	        	});
// 	    }
// 	   });
// 	});
// }
