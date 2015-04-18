function init() {
  /*$("#ColorIn").change(outputUpdate(this.value,1));
  $("#ColorInRange").change(outputUpdate(this.value,2));
  $("#ColorOut").change(outputUpdate(this.value,3));
  $("#ColorOutRange").change(outputUpdate(this.value,4));*/
  var cb = document.getElementById("cb");
  cb.addEventListener("click", handleClick(cb)); //checkbox 

  var colorIn = document.getElementById("ColorIn");
  var colorInRange = document.getElementById("ColorInRange");
  var colorOut = document.getElementById("ColorOut");
  var colorOutRange = document.getElementById("ColorOutRange");

  colorIn.addEventListener("input",wrapperFunction(colorIn.value,1));
  colorInRange.addEventListener("input",wrapperFunction(colorInRange.value,2));
  colorOut.addEventListener('input',wrapperFunction(colorOut.value,3));
  colorOutRange.addEventListener('input',wrapperFunction(colorOutRange.value,4));
}

init();

//Toggles colormanip on the page when button clicked

function handleClick(cb) {
  localStorage.setItem("currentState", (cb.checked ? "on" : "off"));
  console.log("currentState is now " + localStorage.getItem("currentState"));
}

//for testing
/*function display(msg) {
    var p = document.createElement('p');
    p.innerHTML = msg;
    document.body.appendChild(p);
}*/
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

function wrapperFunction(val, num) {
  chrome.tabs.executeScript(outputUpdate(val, num));
}

