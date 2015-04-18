// React when a browser action's icon is clicked.
alert("background begins to run");

if localStorage.currentState = "on"{ 
	$.getScript("imagemanip.js", function(){
		fixPicsInDoc()
	}
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