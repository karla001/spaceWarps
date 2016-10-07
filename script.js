
// var face1=new Image()
// face1.src="d1.png"
// var face2=new Image()
// face2.src="d2.png"
// var face3=new Image()
// face3.src="d3.png"
// var face4=new Image()
// face4.src="d4.png"
var $start   = $('.start');
var $restart = $('.restart');
var $dice    = $('.dice');

var player1 =
var player2 =
var playerTurn  = "Player1"

var win = false


var startGame = function(){
  $start.click(function(event) {
    // add event listener to Dice
    //only when game is started or restarted

    //this function should also display the
    //which player's turn it is in the turn display

  });
}


var rollDice = function(){
  //attach a click handler to dice
  //change bottomDisplay text to "Roll the Dice!"
  //when dice is clicked a random number from 1-4 should be generated
  // The dice background img should change to equal number generated
  //the number generated should be turned into a value variable.
  // after a couple of seconds have passed the position value in
  //the player's var should be changed according to the value rolled
  // players var should somehow correspond to position
}

var restartGame = function(){
  //reset all values to starting values
  //turnDisplay text will return to "An adventure through time!"
  //bottomDisplay will return to "Start the game!"
}


