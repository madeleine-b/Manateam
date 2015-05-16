//red-green colorblind defaults
RGInDefualt = "#469648";
RGOutDefault = "#69C1B0";

//non-colorblind defaults
regInDefault = "#BE2A3A"; //dark raspberry red
regOutDefault = "#6f47e1"; //bright purple

window.addEventListener('DOMContentLoaded', function() {
  init();
  }
);

//initializes HTML components in the ColorSchemer popup,
//either to values received from Chrome local storage or to defaults
function init() {
  cb = document.getElementById("cb");
  colorIn = document.getElementById("ColorIn");
  colorInRange = document.getElementById("ColorInRange");
  colorOut = document.getElementById("ColorOut");
  colorOutRange = document.getElementById("ColorOutRange");
  colorblind = document.getElementById("colorblind");

  if(cb){
    cb.addEventListener("click", function() {handleClick();});
    chrome.storage.local.get("currentState", function(i){
      cb.checked = (i["currentState"]=="on" ? true : false);
      console.log("setting checkbox initially to "+cb.checked);
    });
  }
  if(colorIn){
    colorIn.addEventListener("input",function() {outputUpdate(colorIn.value,1);});
    chrome.storage.local.get("gColorIn", function(items){
        var tempVal=items["gColorIn"];
        colorIn.value = (isExisting(tempVal) ? tempVal : regInDefault);
    });
  }
  if(colorInRange){
    colorInRange.addEventListener("input",function() {outputUpdate(colorInRange.value,2);});
    chrome.storage.local.get("tolIn", function(items){
      var tempVal=items["tolIn"];
      colorInRange.value = (isExisting(tempVal) ? tempVal : 100);
    });
  }
  if(colorOut){
    colorOut.addEventListener('input',function() {outputUpdate(colorOut.value,3);});
    chrome.storage.local.get("gColorOut", function(items){
      var tempVal=items["gColorOut"];
      colorOut.value = (isExisting(tempVal) ? tempVal : regOutDefault);
    });
  }
  if(colorOutRange){
    colorOutRange.addEventListener('input',function() {outputUpdate(colorOutRange.value,4);});
    chrome.storage.local.get("tolOut", function(items){
      var tempVal=items["tolOut"];
      colorOutRange.value = (isExisting(tempVal) ? tempVal : 1);
    });
  }
  if(colorblind){
    colorblind.addEventListener('click',function() {outputUpdate(0,5);});
  }
}

//Called when checkbox for "Color Schemed" is clicked
//Changes value of "currentState" in Chrome local storage
function handleClick() {
  var value = (cb.checked==true) ? "on" : "off";
  console.log("checkbox now "+value);
  chrome.storage.local.set({"currentState":value});
}

//Called when either of the color swatches or tolerances is changed or when "colorblind" button pressed
//Updates values in Chrome local storage
function outputUpdate(val, num) {
  switch(num) {
    case 1:
      chrome.storage.local.set({"gColorIn":val});
      console.log("color in = "+val);
      break;
    case 2:
      chrome.storage.local.set({"tolIn":val});
      console.log("tolerance in = "+val);
      break;
    case 3:
      chrome.storage.local.set({"gColorOut":val});
      console.log("color out = "+val);
      break;
    case 4:
      chrome.storage.local.set({"tolOut":val});
      console.log("tolerance out = "+val);
      break;
    case 5: //colorblind default setting
      /*chrome.storage.local.set({"gColorIn":RGInDefualt});
      chrome.storage.local.set({"gColorOut":RGOutDefault});
      colorIn.value = RGInDefualt;
      colorOut.value = RGOutDefault;*/
      console.log("colorblindness setting pressed");
      console.log("we are temporarily ignoring the request for testing ease!")
      break;
    default:
      console.log("Huh, weirdness with popup and local storage");
  }
}
