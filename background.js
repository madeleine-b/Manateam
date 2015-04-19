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


if (localStorage.getItem("currentState") == "on") { 
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
}