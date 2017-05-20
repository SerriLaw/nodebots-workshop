var five = require('johnny-five');
var board = new five.Board();

board.on("ready", function() {
  var buzzer = new five.Piezo(4);
  var button = new five.Button(13);
  var led = new five.Led(12);



  button.on("press", function() {
    console.log('button press');
    led.toggle();

    var song = {
      tempo: 150, // Beats per minute, default 150
      song: [ // An array of notes that comprise the tune
        [ "g4", 1 ],
        [ "e4", 2 ],
        [ "c4", 3 ],
        [ null, 4 ], // null indicates "no tone" for the beats indicated
        [ "c4", 5 ],
        [ "e4", 6 ],
        [ "g4", 7 ],
        [ null, 8 ] // null indicates "no tone" for the beats indicated
      ]
    };

    buzzer.play(song, 4000);
  });
});
