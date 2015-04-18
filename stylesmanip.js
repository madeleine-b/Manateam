// 1. Iterate through each element on the page
// 2. Replace specified color with another specified color (with margin)

//alert("reaching stylesmanip")

$( document.body ).click(function() {
  $( "[id^='div']" ).each(function(i) {
  	console.log("style: " + $(this).css('background-color'));
    if ($(this).css('background-color') == 'rgb(0, 0, 255)') {
      $(this).css({background: 'yellow'});
    //} else {
      //$(this).css({background: 'blue'});
    }
  });
});

//for testing
function display(msg) {
    var p = document.createElement('p');
    p.innerHTML = msg;
    document.body.appendChild(p);
}