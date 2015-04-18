'''
	1. Load image
	2. Replace colors
	3. Adjust contrast, vibracy, etc. to setting
	4. Put image back (on top of old image?)

	.saturate {-webkit-filter: saturate(3);}
	.grayscale {-webkit-filter: grayscale(100%);}
	.contrast {-webkit-filter: contrast(160%);}
	.brightness {-webkit-filter: brightness(0.25);}
	.blur {-webkit-filter: blur(3px);}
	.invert {-webkit-filter: invert(100%);}
	.sepia {-webkit-filter: sepia(100%);}
	.huerotate {-webkit-filter: hue-rotate(180deg);}
	.rss.opacity {-webkit-filter: opacity(50%);}
'''

alert("reaching colormanip")
chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.type) {
        case "colors-div":
            var divs = document.querySelectorAll("div");
            if(divs.length === 0) {
                alert("There are no any divs in the page.");
            } else {
                for(var i=0; i&lt;divs.length; i++) {
                    divs[i].style.backgroundColor = message.color;
                }
            }
        break;
    }
});

var imageX, imageY;
var imXDim, imYDim;
var colorToReplace = "#AAAAAA", replacementColor = "#BBBBBB";
var toReplaceRGB = hexToRGB(colorToReplace);
var replacementRGB = hexToRGB(replacementColor);

function hexToRGB(h) {
	var rgb = {"r" : hexToR(h), "g" : hexToG(h), "b" : hexToB(h)};
	return rgb;
}
function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

var image = context.getImageData(imageX, imageY, imXDim, imYDim);
var pix = image.data;
var MARGIN = 10;

//just r/g/b in range of, not whole color yet (different?)
for (var i = 0, n = pix.length; i < n; i += 4) {
	if (Math.abs(toReplaceRGB.r-pix[i])<=MARGIN && // red
		Math.abs(toReplaceRGB.g-pix[i+1]<=MARGIN) && // green
		Math.abs(toReplaceRGB.b-pix[i+2]<=MARGIN)) {  // blue
		pix[i] = replacementRGB.r;
		pix[i+1] = replacementRGB.g;
		pix[i+2] = replacementRGB.b;
	}
	//i+3 is alpha channel for opacity
}

// Draw the ImageData at the given (x,y) coordinates.
context.putImageData(image, imageX, imageY);