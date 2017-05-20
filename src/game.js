// GAME:
// The game will show an increasing series of light A or light B
// Player must copy what the game shows
// If player gets the series wrong, game will end

// ------

// start the game
// get first round
// flash the array
// get user input, flash to match
// check player series against game series
// if correct, go to next round
// else end game


var five = require('johnny-five');
var board = new five.Board();

var ledA;
var ledB;
var buttonA;
var buttonB;

var playerSeries = [];
var gameSeries = [];
var round;

var waitTime = 200;

board.on("ready", function() {
  console.log('Starting New Game!');

  ledA = new five.Led(2);
  ledB = new five.Led(3);
  buttonA = new five.Button(12);
  buttonB = new five.Button(13);

  var isPlayerCorrect = true;

  while (isPlayerCorrect) {
    makeRound();
    round = gameSeries.length;

    console.log('Starting Round', round);

    console.log('## Computer\'s Turn ##');
    console.log(gameSeries);
    showGameSeries();
    console.log('## Player\'s Turn ##');

    for (var i = 0; i < gameSeries.length; i++) {
      getPlayerSeries();
    }
    console.log(playerSeries);

    isPlayerCorrect = checkSeries();
  }

  gameEnds();

});


function checkSeries() {
  var flag = true;
  gameSeries.forEach(function(item, index) {
    if (item != playerSeries[index]) {
      flag = false;
    }
  });
  return flag;
}

function makeRound() {
  gameSeries.push(getRandomLed());
}

function getPlayerSeries() {
  ledA.on("press", function() {
    console.log('press A');
    playerSeries.push(0);
  });

  ledB.on("press", function() {
    console.log('press B');
    playerSeries.push(1);
  });
}

function getRandomLed() {
  if (Math.random() > 0.5)
    return 0;
  return 1;
}

function gameEnds() {
  console.log('Game Over!');
  round = 0;
  gameSeries = [];
  playerSeries = [];
}

function showGameSeries() {
  gameSeries.forEach(function(x, index) {
    if (x == 1) {
      ledA.on();
    } else {
      ledB.on();
    }
    setTimeout(function() {
      // turn both off
      ledA.off();
      ledB.off();
    }, waitTime);

  });
}
