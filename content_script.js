
console.log("reaching content script");

var DOMImages = $("img").toArray();
console.log(DOMImages);

$(document).ready(fixPicsInDoc);


/*chrome.runtime.sendMessage({'method':'sendValues'},
	function (response) {
		console.log(response);
		console.log("gonna edit images with values received. tho jk bc localstorage?");
		fixPicsInDoc();
	}
);*/

// chrome.browserAction.onClicked.addListener(function(tab) {
// alert("line 5");
// chrome.runtime.reload();
// alert("line 7");
// chrome.tabs.query({ url: "<all_urls>"}, function(tabs)
// {
//     for(var i = 0; i < tabs.length; i++)
//     {
//         // chrome.tabs.executeScript(tabs[i].id, 
//         	// { code: alert(reaches background); })
//         		// { file: "colormanip.js" }, colorReplaceStuff());
//     	chrome.tabs.executeScript(tabs[i].id, 
//     			{ file: "stylesmanip.js" }, replaceStyle() {});
//     }
// }
// });