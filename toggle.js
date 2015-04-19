function init() {
  var cb = document.getElementById("cb");
  cb.addEventListener("click", function() {handleClick(cb);}); //checkbox 

  colorIn = document.getElementById("ColorIn");
  colorInRange = document.getElementById("ColorInRange");
  colorOut = document.getElementById("ColorOut");
  colorOutRange = document.getElementById("ColorOutRange");

  colorIn.addEventListener("input",function() {outputUpdate(colorIn.value,1);});
  colorInRange.addEventListener("input",function() {outputUpdate(colorInRange.value,2);});
  colorOut.addEventListener('input',function() {outputUpdate(colorOut.value,3);});
  colorOutRange.addEventListener('input',function() {outputUpdate(colorOutRange.value,4);});
  colorOutRange.addEventListener('input',function() {outputUpdate(colorblind.value,5);});

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
  localStorage.setItem("currentState", (cb.checked==true ? "on" : "off"));

  console.log("currentState is now " + localStorage.getItem("currentState"));

  if (cb.checked) {
    console.log("checked");

    values = {'doFxn':true, 'colorIn': colorIn,'colorInRange':colorInRange, 'colorOut':colorOut, 'colorOutRange':colorOutRange};
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
    values = {'doFxn':false, 'colorIn': colorIn,'colorInRange':colorInRange, 'colorOut':colorOut, 'colorOutRange':colorOutRange};

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
    case 5:
      localStorage.setItem("gColorIn", "#009933");
      localStorage.getItem("gColorOut", "#99FF33");
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
