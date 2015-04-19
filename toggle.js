function init() {
  var cb = document.getElementById("cb");
  if(cb){
    cb.addEventListener("click", function() {handleClick(cb);});
  } //checkbox
  colorIn = document.getElementById("ColorIn");
  colorInRange = document.getElementById("ColorInRange");
  colorOut = document.getElementById("ColorOut");
  colorOutRange = document.getElementById("ColorOutRange");
  if(colorIn){
    colorIn.addEventListener("input",function() {outputUpdate(colorIn.value,1);});
  }
  if(colorInRange){
    colorInRange.addEventListener("input",function() {outputUpdate(colorInRange.value,2);});
  }
  if(colorOut){
    colorOut.addEventListener('input',function() {outputUpdate(colorOut.value,3);});}

  if(colorOutRange){
    colorOutRange.addEventListener('input',function() {outputUpdate(colorOutRange.value,4);});
  }
  if(cb){
      chrome.storage.local.get("currentState", function(i){
        cb.checked = (i["currentState"]=="on" ? true : false);
        console.log("setting cb to "+cb.checked);
      });
  }
  if(colorIn){
      var tempVal;
      chrome.storage.local.get("gColorIn", function(items){tempVal=items["gColorIn"];});
      colorIn.value = ((typeof tempVal)!="undefined" ? tempVal : "#BE2A3A");
  }
  if(colorInRange){
    var tempVal;
    chrome.storage.local.get("tolIn", function(items){tempVal=items["tolIn"];});
    colorInRange.value = ((typeof tempVal)!="undefined" ? tempVal : "100");
  }
  if(colorOut){
    var tempVal;
    chrome.storage.local.get("gColorOut", function(items){tempVal=items["gColorOut"];});
    colorOut.value = ((typeof tempVal)!="undefined" ? tempVal : "#6f47e1");
  }
  if(colorOutRange){
    var tempVal;
    chrome.storage.local.get("tolOut", function(items){tempVal=items["tolOut"];});
    colorOutRange.value = ((typeof tempVal)!="undefined" ? tempVal : "100");
  }
}

function isExisting(thing) {
  console.log(thing+" = "+((typeof thing)!=undefined && thing!=null));
  return ((typeof thing)!=undefined && thing!=null);
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