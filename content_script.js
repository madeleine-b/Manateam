
console.log("reaching content script");

var DOMImages = $("img");
chrome.runtime.sendMessage(DOMImages, function (response) {
	console.log("sent off images and got response");
	console.log(response);
});