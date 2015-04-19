//This script replaces all colors (within a defined margin) in each element on the page 
//(div, text, background, etc) with a defined color.

// TODO:
// -What to do with text (and background?) colors that haven't been set? They appear as rgb(0,0,0)...
// -Do for elements other than divs
// -Note: don't think we need margin for replaceWith, because each element will have uniform color


//var MARGIN = 150;
//var toReplace = {"r" : 0, "g" : 0, "b" : 255};
//var replaceWith = "rgb(255, 0, 0)";
var toReplace = localStorage.getItem("gColorIn");
var replaceWith = localStorage.getItem("gColorOut");
MARGIN = localStorage.getItem("tolIn"); //100 to 200
var backgroundRGB = [''];
var colorRGB = [''];
  
//goes through every div/p/h1, etc in the page and replaces specified color with yellow (hard coded for now)
$(document).ready(function() {
  var all = document.getElementsByTagName("*");
  var backgroundInit = ""; 
  var colorInit = "";

    for (var i=0, max=all.length; i < max; i++) {
      backgroundInit = $(all[i]).css('background-color');
      colorInit = $(all[i]).css('color');

      //console.log("first char of backgroundInit: " + backgroundInit.substring(0,1));
      // if (backgroundInit.substring(0,1) != 'r') {
      //   console.log("this is a hex value");
      //   backgroundRGB = splitRGB(hexToRGB(backgroundInit));
      // }
      backgroundRGB = splitRGB($(all[i]).css('background-color'));
      console.log("background: " + $(all[i]).css('background-color'));
      if (colorWithinRange(MARGIN, backgroundRGB[1], backgroundRGB[2], backgroundRGB[3], toReplace)){
        $(all[i]).css({'background-color': replaceWith});
      }

     // if (colorInit.substring(0,1) != 'r') {
     //    console.log("this is a hex value");
     //    colorRGB = splitRGB(hexToRGB(colorInit));
     //  }
      colorRGB = splitRGB($(all[i]).css('color'));
      console.log("color: " + $(all[i]).css('color'));
      if (colorWithinRange(MARGIN, colorRGB[1], colorRGB[2], colorRGB[3], toReplace)
        || colorNotSet(colorRGB)) { //second case trying to take care of color not set
        $(all[i]).css({'color': replaceWith});
      }
    }

    // for (var i=0, max=all.length; i < max; i++) {
    //   colorRGB = splitRGB($(all[i]).css('color'));
    //   console.log("color: " + $(all[i]).css('color'));
    //   if (colorWithinRange(MARGIN, colorRGB[1], colorRGB[2], colorRGB[3], toReplace)
    //     || colorNotSet(colorRGB)) { //second case trying to take care of color not set
    //     $(all[i]).css({'color': replaceWith});
    //   }
    // }
});

//if color was not set... apparently this is rgb(0,0,0) which equals white??
function colorNotSet(RGBarray) {
  //console.log((RGBarray[1] == 0) && (RGBarray[2] == 0) && (RGBarray[3] == 0));
  return ((RGBarray[1] == 0) && (RGBarray[2] == 0) && (RGBarray[3] == 0));
}

function hexToRGB(h) {
    var rgb = [hexToR(h), hexToG(h), hexToB(h)];
    return rgb;
  }
  function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
  function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
  function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
  function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

//stolen from madeleine - checks if web colors are within range of chosen color to replace
function colorWithinRange(margin, webR, webG, webB, toReplace) {
  var distanceBetween = Math.sqrt(Math.pow(webR-toReplace.r,2)+Math.pow(webG-toReplace.g,2)+Math.pow(webB-toReplace.b,2));
  return distanceBetween<=margin;
}

function splitRGB(rgb) {
  var split = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
  var splitArray = split.exec(rgb);
  return splitArray;
  //console.log("in splitRGB, splitArray: " + splitArray);
}