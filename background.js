// React when a browser action's icon is clicked.
console.log("background running");

if (localStorage.getItem("currentState") && localStorage.getItem("currentState") == "on") { 
	$.getScript("colormanip.js", function(){
		var images=$('img');
		fixPicsInDoc(images);
	});
	// replaceStyle()
}


// chrome.browserAction.onClicked.addListener(function(tab) {

// chrome.runtime.reload();
// chrome.tabs.query({ url: "<all_urls>"}, function(tabs)
// {
//     for(var i = 0; i < tabs.length; i++)
//     {
//         chrome.tabs.executeScript(tabs[i].id, 
//         	{ code: "alert(reaches background);" });
//         		// { file: "colormanip.js" }, colorReplaceStuff());
//     	// chrome.tabs.executeScript(tabs[i].id, 
//     	// 		{ file: "stylesmanip.js" }, replaceStyle() {});
//     }
// });