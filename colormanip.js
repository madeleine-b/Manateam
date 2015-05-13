//Helper function to create canvas for altered image
function createCanvas(img) {
    var canvas = document.createElement('canvas');

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
    canvas.style.top = getPosition(img).y;
    canvas.style.left = getPosition(img).x;

    return canvas;
}

//Returns a dictionary corresponding to the 'x' and 'y' coordinates of element
function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { "x": xPosition, "y": yPosition };
}

//Goes through each <img> in document and "Color Schemes" it!
//Uses colors and tolerances in Chrome local storage
function fixPicsInDoc() {
	var images = $('img');
	console.log("fixPics will execute on "+images.length+" images");
	
	var colorToReplace;
	var replacementColor;
	toReplaceRGB = {};
	replacementRGB = {};
	G_COLOR_IN_MARGIN = 0;
	G_COLOR_OUT_MARGIN = 0;

	//getting variables values from Chrome local storage or setting defaults
	chrome.storage.local.get("gColorIn", function(item) {
		if (isExisting(item["gColorIn"])) {
			colorToReplace = item["gColorIn"];
		} else {
			colorToReplace = "#ff6500"; //coral
		}
		toReplaceRGB = hexToRGB(colorToReplace);
	});
	chrome.storage.local.get("gColorOut", function(item) {
		if (isExisting(item["gColorOut"])) {
			replacementColor = item["gColorOut"];
		} else {
			replacementColor = "#AA0078"; //purple
		}
		replacementRGB = hexToRGB(replacementColor);
	});
	chrome.storage.local.get("tolIn", function(item) {
		if (isExisting(item["tolIn"])) {
			G_COLOR_IN_MARGIN = parseInt(item["tolIn"]);
		} else {
			G_COLOR_IN_MARGIN = 125;
		}
	}); //values between 95 to 200 (as specified in popup.html)
	chrome.storage.local.get("tolOut", function(item) {
		if (isExisting(item["tolOut"])) {
			G_COLOR_OUT_MARGIN = parseInt(item["tolOut"]);
		} else {
			G_COLOR_OUT_MARGIN = 1; //between 0.9 and 3 seems best. don't go beyond 1 if you want only shades of the replacementColor
		}

		//hopefully other values have been retrieved by now too
		for (var i = 0; i < images.length; i++) {
			colorReplace(images[i]);
		}
	}); //values between 0.8 to 3 (as specified in popup.html)

	function hexToRGB(h) {
		var rgb = {"r" : hexToR(h), "g" : hexToG(h), "b" : hexToB(h)};
		return rgb;
	}
	function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
	function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
	function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
	function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7) : h;}

}

//Given a single image, iterates pixel-by-pixel to alter data and replace image with the edited pic
function colorReplace(img) {
	var canvas = createCanvas(img); //creates canvas with same *dimensions* as img
	var context = canvas.getContext('2d');

	//var imageX = getAbsPosition(img)[1], imageY = getAbsPosition(img)[0];
	
	context.drawImage(img, 0, 0);
	try {
		var image = context.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
		for (var i = 0, n = image.data.length; i < n; i += 4) {
			//3D RGB space mapping :)
			if (colorWithinRange(G_COLOR_IN_MARGIN, image.data[i], image.data[i+1], image.data[i+2], toReplaceRGB)) {
				var originalVMag = magnitude(image.data, i, toReplaceRGB);
				var scalingFactor = G_COLOR_OUT_MARGIN*originalVMag/G_COLOR_IN_MARGIN;
				image.data[i] = replacementRGB.r + (image.data[i] - toReplaceRGB.r)*scalingFactor;
				image.data[i+1] = replacementRGB.g + (image.data[i+1] - toReplaceRGB.g)*scalingFactor;
				image.data[i+2] = replacementRGB.b + (image.data[i+2] - toReplaceRGB.b)*scalingFactor;
				
				//put on whatever boundary it crosses, if it does
				image.data[i] = (image.data[i] < 0) ? 0 : image.data[i];
				image.data[i] = (image.data[i] > 255) ? 255 : image.data[i];
				image.data[i+1] = (image.data[i+1] < 0) ? 0 : image.data[i+1];
				image.data[i+1] = (image.data[i+1] > 255) ? 255 : image.data[i+1];
				image.data[i+2] = (image.data[i+2] < 0) ? 0 : image.data[i+2];
				image.data[i+2] = (image.data[i+2] > 255) ? 255 : image.data[i+2];
			}
			//i+3 is alpha channel for opacity
		}

		context.putImageData(image, 0, 0);
		canvas.style.width = img.width+"px";
		canvas.style.height = img.height+"px";

		img.parentNode.insertBefore(canvas, img.nextSibling);
		img.parentNode.removeChild(img);
		console.log("image replacement success");
	} catch (error) {
		console.log("\"security\" error ya know");
	}
}

//Returns the magnitude of the vector between
//	(toReplace.r, toReplace.g, toReplace.b) and (data[i], data[i+1], data[i+2]) in 3D RGB space
function magnitude(data, i, toReplaceRGB) {
	var r = data[i] - toReplaceRGB.r;
	var g = data[i+1] - toReplaceRGB.g;
	var b = data[i+2] - toReplaceRGB.b;
	return Math.sqrt(r*r+g*g+b*b);
}

//Returns a boolean corresponding to whether 'thing' most likely has a defined value
function isExisting(thing) {
  return thing!="undefined" && thing!="null" && ((typeof thing)!="undefined") && ((typeof thing)!=undefined && thing!=null);
}

//Returns a boolean about whether the color (imageR, imageG, imageB) is within varMargin of (toReplace.r, toReplace.g, toReplace.b)
//thinking in terms of the 3D RGB space
function colorWithinRange(varMargin, imageR, imageG, imageB, toReplace) {
	var distanceBetween = Math.sqrt(Math.pow(imageR-toReplace.r,2)+Math.pow(imageG-toReplace.g,2)+Math.pow(imageB-toReplace.b,2));
	return distanceBetween<=varMargin;
}



