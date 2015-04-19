function init() {
  var cb = document.getElementById("cb");
  cb.addEventListener("click", function() {handleClick(cb);}); //checkbox 

  var colorIn = document.getElementById("ColorIn");
  var colorInRange = document.getElementById("ColorInRange");
  var colorOut = document.getElementById("ColorOut");
  var colorOutRange = document.getElementById("ColorOutRange");

  colorIn.addEventListener("input",function() {outputUpdate(colorIn.value,1);});
  colorInRange.addEventListener("input",function() {outputUpdate(colorInRange.value,2);});
  colorOut.addEventListener('input',function() {outputUpdate(colorOut.value,3);});
  colorOutRange.addEventListener('input',function() {outputUpdate(colorOutRange.value,4);});

  if (localStorage.getItem("currentState")!="undefined") {
    cb.checked = (localStorage.getItem("currentState")=="on" ? true : false);
  } else {
    cb.checked = false;
  }

  colorIn.value = (typeof localStorage.getItem("gColorIn")!="undefined" ? localStorage.getItem("gColorIn") : "#ff0000");
  colorInRange.value = (typeof localStorage.getItem("tolIn")!="undefined" ? localStorage.getItem("tolIn") : "100");
  colorOut.value = (typeof localStorage.getItem("gColorOut")!="undefined" ? localStorage.getItem("gColorOut") : "#ff0000");
  colorOutRange.value = (typeof localStorage.getItem("tolOut")!="undefined" ? localStorage.getItem("tolOut") : "100");

}

window.addEventListener('DOMContentLoaded', function() {init();});

//Toggles colormanip on the page when button clicked
function handleClick(cb) {
  localStorage.setItem("currentState", (cb.checked ? "on" : "off"));
  console.log("currentState is now " + localStorage.getItem("currentState"));

  if (cb.checked) {
    console.log("checked");
    /*chrome.runtime.sendMessage({method:'getImages'}, function(response){
      console.log("got response");
      fixPicsInDoc(response);
    });*/
    console.log("changing colors in images on page?");
    chrome.runtime.sendMessage({'method':'getImages'}, function(response){
      console.log("response=");
      console.log(response);
      fixPicsInDoc(response.title);
    });
    //fixPicsInDoc(images);
  }
}

function outputUpdate(val, num) { 
  console.log(val);
  switch(num) {
    case 1:
      localStorage.setItem("gColorIn",val);
      break;
    case 2:
      localStorage.setItem("tolIn",val);
      break;
    case 3:
      localStorage.setItem("gColorOut",val);
      break;
    case 4:
      localStorage.setItem("tolOut", val);
      break;
    default:
      console.log("Huh, weirdness with popup and local storage");
  }
}

