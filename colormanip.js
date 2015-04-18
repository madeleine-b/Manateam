/*
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
*/

function colorReplaceStuff() {
	var canvas = createCanvas(); //also adds to page hopefully
	var context = canvas.getContext('2d');
	var img = document.getElementById('someImageID');

	var imageX = getAbsPosition(img)[1], imageY = getAbsPosition(img)[0]; 
	context.drawImage(img, imageX, imageY);

	var image = context.getImageData(imageX, imageY, img.width, img.height);
	var MARGIN = 10;

	var colorToReplace = "#C9F1FE", replacementColor = "#000000"; //green with white
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
 
	//just r/g/b in range of, not whole color yet (different?)
	for (var i = 0, n = image.data.length; i < n; i += 4) {
		if (Math.abs(toReplaceRGB.r-image.data[i])<=MARGIN && // red
			Math.abs(toReplaceRGB.g-image.data[i+1]<=MARGIN) && // green
			Math.abs(toReplaceRGB.b-image.data[i+2]<=MARGIN)) {  // blue
			image.data[i] = replacementRGB.r;
			image.data[i+1] = replacementRGB.g;
			image.data[i+2] = replacementRGB.b;
		}
		//i+3 is alpha channel for opacity
	}

	// Draw the ImageData at the given (x,y) coordinates
	context.putImageData(image, imageX, imageY);
	console.log("success?");
}

function createCanvas() {
    //var body = document.getElementsByTagName("body")[0];
    var canvas = document.createElement('canvas');
    
    canvas.width = $("#someImageID").width()+10;
    canvas.height = $("#someImageID").height()+10;
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
    canvas.style.position = "absolute"; //hmmm?

    $("#someImageID").after(canvas);

    return canvas;
}

//thanks @SO
function getAbsPosition (el){
    var el2 = el;
    var curtop = 0;
    var curleft = 0;
    if (document.getElementById || document.all) {
        do  {
            curleft += el.offsetLeft-el.scrollLeft;
            curtop += el.offsetTop-el.scrollTop;
            el = el.offsetParent;
            el2 = el2.parentNode;
            while (el2 != el) {
                curleft -= el2.scrollLeft;
                curtop -= el2.scrollTop;
                el2 = el2.parentNode;
            }
        } while (el.offsetParent);

    } else if (document.layers) {
        curtop += el.y;
        curleft += el.x;
    }
    return [curtop, curleft];
}

