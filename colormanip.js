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
	//console.log("the image is at should be (50,30): ("+imageX+", "+imageY+")");
	//console.log("width="+img.width+" height="+img.height);

	context.drawImage(img, 0, 0);

	var image = context.getImageData(imageX, imageY, img.width, img.height);
	MARGIN = 10;

	var colorToReplace = "#AD202E", replacementColor = "#000000"; //light blue with black
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
		/*if (Math.abs(toReplaceRGB.r-image.data[i])<=MARGIN && // red
 			Math.abs(toReplaceRGB.g-image.data[i+1]<=MARGIN) && // green
 			Math.abs(toReplaceRGB.b-image.data[i+2]<=MARGIN))  { //blue
			image.data[i] = replacementRGB.r;
			image.data[i+1] = replacementRGB.g;
			image.data[i+2] = replacementRGB.b;
		}*/
		if (colorWithinRange(150, image.data[i], image.data[i+1], image.data[i+2], image.data[i+3], toReplaceRGB)) {
			image.data[i] = replacementRGB.r;
			image.data[i+1] = replacementRGB.g;
			image.data[i+2] = replacementRGB.b;
		}
		//i+3 is alpha channel for opacity
	}

	$("#someImageID").remove();
	context.putImageData(image, imageX, imageY);
	console.log("image replacement success");
}

 //currently unused, though should? be more accurate since RGB is 3D space
function colorWithinRange(varMargin, imageR, imageG, imageB, toReplace) {
	var distanceBetween = Math.sqrt(Math.pow(imageR-toReplace.r,2)+Math.pow(imageG-toReplace.g,2)+Math.pow(imageB-toReplace.b,2));
	return distanceBetween<=varMargin;
}

function createCanvas() {
    var canvas = document.createElement('canvas');
    
    var img = $("#someImageID");
    canvas.width = img.width();
    canvas.height = img.height();
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
    console.log("top "+img.offset().top+" left "+img.offset().left+" right "+img.offset().right+" bottom "+img.offset().bottom);
    canvas.style.top = (img.offset().top ? img.offset().top : 0);
    canvas.style.left = (img.offset().left ? img.offset().left : 0);
    canvas.style.right = (img.offset().right ? img.offset().right : 0);
    canvas.style.bottom = (img.offset().bottom ? img.offset().bottom : 0);

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

