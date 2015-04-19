
function createCanvas(img) {
    var canvas = document.createElement('canvas');

    //canvas.width = img.width;
    //canvas.height = img.height;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
    canvas.style.top = getPosition(img).y;
    canvas.style.left = getPosition(img).x;

    return canvas;
}

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

function fixPicsInDoc() {
	var images = $('img');
	console.log("fixPics executes on "+images.length+" images");
	
	var colorToReplace;
	var replacementColor;
	toReplaceRGB = "";
	replacementRGB = "";

	chrome.storage.local.get("gColorIn", function(item) {
		if (isExisting(item["gColorIn"])) {
			colorToReplace = item["gColorIn"];
			console.log(colorToReplace+"=ctr");
		} else {
			colorToReplace = "#BE2A3A";
		}
	});
	
	chrome.storage.local.get("gColorOut", function(item) {
		if (isExisting(item["gColorOut"])) {
			replacementColor = item["gColorOut"];
		} else {
			replacementColor = "#6f47e1";
		}
	});

	G_COLOR_IN_MARGIN = 0;
	G_COLOR_OUT_MARGIN = 0;
	chrome.storage.local.get("tolIn", function(item) {
		if (isExisting(item["tolIn"])) {
			G_COLOR_IN_MARGIN = parseInt(item["tolIn"]);
		} else {
			G_COLOR_IN_MARGIN = 150;
		}
	}); //100 to 200
	chrome.storage.local.get("tolOut", function(item) {
		if (isExisting(item["tolOut"])) {
			G_COLOR_OUT_MARGIN = parseInt(item["tolOut"]);
		} else {
			G_COLOR_OUT_MARGIN = 150;
		}
	}); //100 to 200

	
	/*var colorToReplace = "#BE2A3A";
	var replacementColor = "#6f47e1";
	G_COLOR_IN_MARGIN = "150"; //100 to 200
	G_COLOR_OUT_MARGIN = "150"; //100 to 200*/

	//console.log("HIHIHI"+chrome.storage.local.get("gColorIn", function(i){}));
	
	/*var colorToReplace = "#BE2A3A";
	var replacementColor = 	"#6f47e1";
	G_COLOR_IN_MARGIN = 150;
	G_COLOR_OUT_MARGIN = 150;*/

	setTimeout(function(){
		toReplaceRGB = hexToRGB(colorToReplace);
		replacementRGB = hexToRGB(replacementColor);
	}, 100);
	

	function hexToRGB(h) {
		var rgb = {"r" : hexToR(h), "g" : hexToG(h), "b" : hexToB(h)};
		return rgb;
	}
	function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
	function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
	function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
	function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7) : h;}

	for (var i = 0; i < images.length; i++) {
		colorReplace(images[i]);
	}
}

function colorReplace(img) {
	var canvas = createCanvas(img); //creates canvas with same *dimensions* as img
	var context = canvas.getContext('2d');

	//var imageX = getAbsPosition(img)[1], imageY = getAbsPosition(img)[0];
	
	context.drawImage(img, 0, 0);
	var image = context.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
 
	for (var i = 0, n = image.data.length; i < n; i += 4) {
		//3D RGB space mapping :)
		if (colorWithinRange(G_COLOR_IN_MARGIN, image.data[i], image.data[i+1], image.data[i+2], toReplaceRGB)) {
			image.data[i] = replacementRGB.r + (image.data[i] - toReplaceRGB.r)*(G_COLOR_OUT_MARGIN/magnitude(image.data, i, toReplaceRGB));
			image.data[i+1] = replacementRGB.g + (image.data[i+1] - toReplaceRGB.g)*(G_COLOR_OUT_MARGIN/magnitude(image.data, i, toReplaceRGB));
			image.data[i+2] = replacementRGB.b + (image.data[i+2] - toReplaceRGB.b)*(G_COLOR_OUT_MARGIN/magnitude(image.data, i, toReplaceRGB));
		}
		//i+3 is alpha channel for opacity
	}

	context.putImageData(image, 0, 0);
	canvas.style.width = img.width+"px";
	canvas.style.height = img.height+"px";

	img.parentNode.insertBefore(canvas, img.nextSibling);
	img.parentNode.removeChild(img);

	console.log("image replacement success");
}

function magnitude(data, i, toReplaceRGB) {
	var r = data[i] - toReplaceRGB.r;
	var g = data[i+1] - toReplaceRGB.g;
	var b = data[i+2] - toReplaceRGB.b;
	return Math.sqrt(r*r+g*g+b*b);
}

function isExisting(thing) {
  return thing!="undefined" && thing!="null" && ((typeof thing)!="undefined") && ((typeof thing)!=undefined && thing!=null);
}

function colorWithinRange(varMargin, imageR, imageG, imageB, toReplace) {
	var distanceBetween = Math.sqrt(Math.pow(imageR-toReplace.r,2)+Math.pow(imageG-toReplace.g,2)+Math.pow(imageB-toReplace.b,2));
	return distanceBetween<=varMargin;
}


