var five = require('johnny-five');
var board = new five.Board();


board.on("ready", function() {
  // new LED at pos 13
  var led = new five.Led(13);

  led.blink(200);
});
