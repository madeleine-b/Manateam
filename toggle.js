function init() {
  /*$("#ColorIn").change(outputUpdate(this.value,1));
  $("#ColorInRange").change(outputUpdate(this.value,2));
  $("#ColorOut").change(outputUpdate(this.value,3));
  $("#ColorOutRange").change(outputUpdate(this.value,4));*/
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
}

init();

//Toggles colormanip on the page when button clicked

function handleClick(cb) {
  localStorage.setItem("currentState", (cb.checked ? "on" : "off"));
  console.log("currentState is now " + localStorage.getItem("currentState"));
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

