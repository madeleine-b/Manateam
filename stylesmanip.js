// 1. Iterate through each element on the page
// 2. Replace specified color with another specified color (with margin)


var MARGIN = 150;
var toReplace = {"r" : 0, "g" : 0, "b" : 255};

//haven't implemented this yet, just hard coding for now
//var replaceWith = {"r" : 0, "g" : 255, "b" : 255};

//goes through every div in the page and replaces specified color with yellow (hard coded for now)
$( document ).ready(function() {
  $("[id^='div']").each(function(i) {
  	var webHex = rgb2hex($(this).css('background-color'));
  	webRGB = hexToRGB(webHex);
  	console.log("div" + (i+1) + ": r: " + webRGB.r + " g: " + webRGB.g + " b: " + webRGB.b);
    if (colorWithinRange(MARGIN, webRGB.r, webRGB.g, webRGB.b, toReplace)) {
    	$(this).css({'background-color': 'yellow'});
    	console.log("color replaced");
    }
  });
});

//stolen from madeleine - checks if web colors are within range of chosen color to replace
function colorWithinRange(margin, webR, webG, webB, toReplace) {
	var distanceBetween = Math.sqrt(Math.pow(webR-toReplace.r,2)+Math.pow(webG-toReplace.g,2)+Math.pow(webB-toReplace.b,2));
	return distanceBetween<=margin;
}

//converts hex back to rgb
function hexToRGB(h) {
		var rgb = {"r" : hexToR(h), "g" : hexToG(h), "b" : hexToB(h)};
		return rgb;
	}
	function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
	function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
	function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
	function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

//converts rgb to hex (because i am dum but it's ok it works)
function rgb2hex(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}