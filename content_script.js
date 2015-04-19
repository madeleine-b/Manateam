
console.log("reaching content script");

var DOMImages = $("img");
chrome.runtime.sendMessage(DOMImages, function (response) {
	console.log("sent off images and got response");
	console.log(response);
});

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