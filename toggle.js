function init() {
  var cb = document.getElementById("cb");
  if(cb){
    cb.addEventListener("click", function() {handleClick(cb);});
  } //checkbox

  colorIn = document.getElementById("ColorIn");
  colorInRange = document.getElementById("ColorInRange");
  colorOut = document.getElementById("ColorOut");
  colorOutRange = document.getElementById("ColorOutRange");
  colorblind = document.getElementById("colorblind");

  if(colorIn){
    colorIn.addEventListener("input",function() {outputUpdate(colorIn.value,1);});
  }
  if(colorInRange){
    colorInRange.addEventListener("input",function() {outputUpdate(colorInRange.value,2);});
  }
  if(colorOut){
    colorOut.addEventListener('input',function() {outputUpdate(colorOut.value,3);});
  }
  if(colorOutRange){
    colorOutRange.addEventListener('input',function() {outputUpdate(colorOutRange.value,4);});
  }

  if(cb){
      chrome.storage.local.get("currentState", function(i){
        cb.checked = (i["currentState"]=="on" ? true : false);
        console.log("setting cb to "+cb.checked);
      });
  }

  if(colorblind){
    colorblind.addEventListener('input',function() {outputUpdate(0,5);});
  }

  if (localStorage.getItem("currentState")!="undefined") {
    if(cb){
      cb.checked = (localStorage.getItem("currentState")=="on" ? true : false);
    }
  } else {
      cb.checked = false;
  }
  if(colorIn){
      chrome.storage.local.get("gColorIn", function(items){
        var tempVal=items["gColorIn"];
        colorIn.value = (isExisting(tempVal) ? tempVal : "#BE2A3A");
      });
  }
  if(colorInRange){
    chrome.storage.local.get("tolIn", function(items){
      var tempVal=parseInt(items["tolIn"]);
      colorInRange.value = (isExisting(tempVal) ? tempVal : 100);
    });
  }
  if(colorOut){
    chrome.storage.local.get("gColorOut", function(items){
      var tempVal=items["gColorOut"];
      colorOut.value = (isExisting(tempVal) ? tempVal : "#6f47e1");
    });
  }
  if(colorOutRange){
    chrome.storage.local.get("tolOut", function(items){
      var tempVal=parseInt(items["tolOut"]);
      colorOutRange.value = (isExisting(tempVal) ? tempVal : 100);
    });
  }
}

window.addEventListener('DOMContentLoaded', function() {init();});

//Toggles colormanip on the page when button clicked
function handleClick(cb) {
  chrome.storage.local.set({"currentState":(cb.checked==true ? "on" : "off")});
  chrome.storage.local.get("currentState", function(items){console.log("currentState is now " + items);});

  /*if (cb.checked) {
    console.log("checked");
    chrome.runtime.sendMessage(
      {'method':'getValues', 'values':values},
      function(response){
        console.log("response=");
        console.log(response);
      }
    );
  //fixPicsInDoc(images);
  } else {
    console.log("unchecked");
  }*/
}

function outputUpdate(val, num) {
  //console.log(val);
  switch(num) {
    case 1:
      chrome.storage.local.set({"gColorIn":val});
      chrome.storage.local.get("gColorIn", function(items) {
        console.log(items["gColorIn"]);
      });
      break;
    case 2:
      chrome.storage.local.set({"tolIn":val});
      chrome.storage.local.get("tolIn", function(items) {
        console.log(items["tolIn"]);
      });
      break;
    case 3:
      chrome.storage.local.set({"gColorOut":val});
      chrome.storage.local.get("gColorOut", function(items) {
        console.log(items["gColorOut"]);
      });
      break;
    case 4:
      chrome.storage.local.set({"tolOut":val});
      chrome.storage.local.get("tolOut", function(items) {
        console.log(items["tolOut"]);
      });
      break;
    case 5:
      localStorage.setItem("gColorIn","469648");
      localStorage.setItem("gColorOut","69C1B0");
      break;
    default:
      console.log("Huh, weirdness with popup and local storage");
  }
}
/*
TODO: Also adjust contrast, vibracy, etc. to setting
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