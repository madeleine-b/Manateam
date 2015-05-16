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
	originals = $('img'); 
	console.log("fixPics will execute on "+originals.length+" images");
	
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
			//console.log("Old value found for colorToReplace is "+colorToReplace);
		} else {
			colorToReplace = "#ff6500"; //coral
			//console.log("No old value found for colorToReplace so we set to "+colorToReplace);
		}
		toReplaceRGB = hexToRGB(colorToReplace);
	});
	chrome.storage.local.get("gColorOut", function(item) {
		if (isExisting(item["gColorOut"])) {
			replacementColor = item["gColorOut"];
			//console.log("Old value found for replacementColor is "+replacementColor);
		} else {
			replacementColor = "#AA0078"; //purple
			//console.log("No old value found for replacementColor so we set to "+replacementColor);
		}
		replacementRGB = hexToRGB(replacementColor);
	});
	chrome.storage.local.get("tolIn", function(item) {
		if (isExisting(item["tolIn"])) {
			G_COLOR_IN_MARGIN = item["tolIn"];
		} else {
			G_COLOR_IN_MARGIN = 125;
		}
	}); //values between 95 to 200 (as specified in popup.html)
	chrome.storage.local.get("tolOut", function(item) {
		if (isExisting(item["tolOut"])) {
			G_COLOR_OUT_MARGIN = item["tolOut"];
		} else {
			G_COLOR_OUT_MARGIN = 1; //between 0.9 and 3 seems best. don't go beyond 1 if you want only shades of the replacementColor
			//console.log("No old value found for output tolerance so we set to 1");
		}
		//hopefully other values have been retrieved by now too
		for (var i = 0; i < originals.length; i++) {
			colorReplace(originals[i], toReplaceRGB, replacementRGB, G_COLOR_IN_MARGIN, G_COLOR_OUT_MARGIN);
		}
	}); //values between 0.8 to 3 (as specified in popup.html)

}

function hexToRGB(h) {
	var rgb = {"r" : hexToR(h), "g" : hexToG(h), "b" : hexToB(h)};
	return rgb;
}
function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7) : h;}


//Given a single image, iterates pixel-by-pixel to alter data and replace image with the edited pic
function colorReplace(img, toReplaceRGB_par, replacementRGB_par, in_margin, out_margin) {
	var canvas = createCanvas(img); //creates canvas with same *dimensions* as img
	var context = canvas.getContext('2d');
	
	context.drawImage(img, 0, 0);
	try {
		var image = context.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
		for (var i = 0, n = image.data.length; i < n; i += 4) {
			//3D RGB space mapping :)
			if (colorWithinRange(in_margin, image.data[i], image.data[i+1], image.data[i+2], toReplaceRGB_par)) {
				var originalVMag = magnitude(image.data, i, toReplaceRGB_par);
				var scalingFactor = out_margin*originalVMag/in_margin;
				image.data[i] = replacementRGB_par.r + (image.data[i] - toReplaceRGB_par.r)*scalingFactor;
				image.data[i+1] = replacementRGB_par.g + (image.data[i+1] - toReplaceRGB_par.g)*scalingFactor;
				image.data[i+2] = replacementRGB_par.b + (image.data[i+2] - toReplaceRGB_par.b)*scalingFactor;
				
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

		var randomID = Math.floor(Math.random()*100000);
		var finalImage = document.createElement("img");
		finalImage.src = canvas.toDataURL("image/png");
		finalImage.id = "edited"+randomID;

		img.parentNode.insertBefore(finalImage, img.nextSibling);

		jQuery.data(img, "uniqueID", randomID);
		// var displayType = (img.style.display.length > 0) ? img.style.display.toString() : 'inline'; 
		// jQuery.data(img, "origDisplayType", displayType);
		img.style.display = "none";
		console.log("image replacement success");
	} catch (error) {
		console.log("\"security\" error ya know: "+error.message);
	}
}

function replaceOriginalImages() {
	for(var i = 0; i < originals.length; i++) {
		var searchingID = 'edited'+jQuery.data(originals[i],'uniqueID');
		var edited = document.getElementById(searchingID);
		//var newDisplayType = (jQuery(originals[i],"origDisplayType")[0].toString().length > 0) ? jQuery(originals[i],"origDisplayType")[0].toString() : 'inline';
		//UGHHHHH!!! ^^^ doesn't work but why? no respect 4 types or something :p

		originals[i].parentNode.removeChild(edited);
		// originals[i].style.display = newDisplayType;
		originals[i].style.display = "inline";
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



