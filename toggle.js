//Toggles colormanip on the page when button clicked

function handleClick(cb) {
    //display("Click, new value = " + cb.checked); //for testing

    //global variable to set as on or off to toggle colormanip
    var currentState = 	currentState || "off";

    if (cb.checked) {
    	//call colormanip.js
    	//display("Click, new value = " + cb.checked); //for testing
    	//$.getScript("colormanip.js", function(){
   		//alert("Script loaded and executed.");
   		localStorage.currentState = "on";
   		display("localStorage = " + localStorage.currentState);
    }
    else {
    	localStorage.currentState = "off";
   		display("localStorage = " + localStorage.currentState);
    }
}

//for testing
function display(msg) {
    var p = document.createElement('p');
    p.innerHTML = msg;
    document.body.appendChild(p);
}

function outputUpdate(val,num) { 
  switch(num)
  1: localStorage.gColorIn = val;
  2: localStorage.tolIn = val;
  3: localStorage.gColorOut = val;
  4: localStorage.tolOut = val;
  }