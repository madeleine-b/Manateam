RGInDefualt = "#469648";
RGOutDefault = "#69C1B0";
regInDefault = "#BE2A3A";
regOutDefault = "#6f47e1";

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
      var tempVal=parseInt(items["tolIn"]);
      colorInRange.value = (isExisting(tempVal) ? tempVal : 100);
    });
  }
  if(colorOut){
    colorOut.addEventListener('input',function() {outputUpdate(colorOut.value,3);});
    chrome.storage.local.get("gColorOut", function(items){
      var tempVal=items["gColorOut"];
      console.log("gColorOut = "+tempVal+"!!!!");
      colorOut.value = (isExisting(tempVal) ? tempVal : regOutDefault);
    });
  }
  if(colorOutRange){
    colorOutRange.addEventListener('input',function() {outputUpdate(colorOutRange.value,4);});
    chrome.storage.local.get("tolOut", function(items){
      var tempVal=parseInt(items["tolOut"]);
      colorOutRange.value = (isExisting(tempVal) ? tempVal : 1);
    });
  }
  if(colorblind){
    colorblind.addEventListener('click',function() {outputUpdate(0,5);});
  }
}

window.addEventListener('DOMContentLoaded', function() {
  init();
  }
);

//Toggles colormanip on the page when button clicked
function handleClick() {
  chrome.storage.local.set({"currentState":(cb.checked==true ? "on" : "off")}, function() {
    console.log("inside set callback");
    chrome.storage.local.get("currentState", function(items){
      console.log("inside get callback");
      console.log("currentState in local storage is " + items["currentState"]);
    });
  });

}

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
      chrome.storage.local.set({"gColorIn":RGInDefualt});
      chrome.storage.local.set({"gColorOut":RGOutDefault});
      console.log("colorblindness setting pressed");
      break;
    default:
      console.log("Huh, weirdness with popup and local storage");
  }
}
