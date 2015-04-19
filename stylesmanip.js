//This script replaces all colors (within a defined margin) in each element on the page 
//(div, text, background, etc) with a defined color.

// TODO:
// -Do for elements other than divs
// -Note: don't think we need margin for replaceWith, because each element will have uniform color

var MARGIN = 150;
var toReplace = {"r" : 0, "g" : 0, "b" : 255};
var replaceWith = "rgb(255, 255, 0)";
var backgroundRGB = [''];
var colorRGB = [''];
  
//goes through every div/p/h1, etc in the page and replaces specified color with yellow (hard coded for now)
$(document).ready(function() {
  var all = document.getElementsByTagName("*");
    for (var i=0, max=all.length; i < max; i++) {
      backgroundRGB = splitRGB($(all[i]).css('background-color'));
      if (colorWithinRange(MARGIN, backgroundRGB[1], backgroundRGB[2], backgroundRGB[3], toReplace)) {
        $(all[i]).css({'background-color': replaceWith});
      }
    }

    for (var i=0, max=all.length; i < max; i++) {
      colorRGB = splitRGB($(all[i]).css('color'));
      if (colorWithinRange(MARGIN, colorRGB[1], colorRGB[2], colorRGB[3], toReplace)) {
        $(all[i]).css({'color': replaceWith});
      }
    }
});

//stolen from madeleine - checks if web colors are within range of chosen color to replace
function colorWithinRange(margin, webR, webG, webB, toReplace) {
	var distanceBetween = Math.sqrt(Math.pow(webR-toReplace.r,2)+Math.pow(webG-toReplace.g,2)+Math.pow(webB-toReplace.b,2));
	return distanceBetween<=margin;
}

// //converts hex back to rgb
// function hexToRGB(h) {
// 		var rgb = {"r" : hexToR(h), "g" : hexToG(h), "b" : hexToB(h)};
// 		return rgb;
// 	}
// 	function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
// 	function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
// 	function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
// 	function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

function splitRGB(rgb) {
  var split = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
  var splitArray = split.exec(rgb);
  return splitArray;
  //console.log("in splitRGB, splitArray: " + splitArray);
}

// //converts rgb to hex (because i am dum but it's ok it works)
// function rgb2hex(rgb) {
//     if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
//     rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
//     function hex(x) {
//         return ("0" + parseInt(x).toString(16)).slice(-2);
//     }
//     return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
// }