function init() {
  $("#cb").on("click", handleClick($("#cb"))); //checkbox 
  /*$("#ColorIn").change(outputUpdate(this.value,1));
  $("#ColorInRange").change(outputUpdate(this.value,2));
  $("#ColorOut").change(outputUpdate(this.value,3));
  $("#ColorOutRange").change(outputUpdate(this.value,4));*/
  $("#ColorIn").on('input propertychange',outputUpdate(this.value,1));
  $("#ColorInRange").on('input propertychange',outputUpdate(this.value,2));
  $("#ColorOut").on('input propertychange',outputUpdate(this.value,3));
  $("#ColorOutRange").on('input propertychange',outputUpdate(this.value,4));
  console.log($("#ColorIn"));
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