//mute
var $mutebutton = $('.mute');
var $audio = $('audio');

function sound(){
  $mutebutton.on('click',function(event) {
    if($audio[0].muted === false){
      $audio.attr('muted',true)
      $audio[0].muted = true;
      $mutebutton.text('Unmute');
      // $mutebutton.css('font-size', '.5em');
      console.log('Muted');
    }else if($audio[0].muted === true){
      $audio.removeAttr('muted')
      $audio[0].muted = false;
      $mutebutton.text('Mute');
      // $mutebutton.css('font-size', '.5em');
      console.log('Unmuted');
    }
  });
};
sound();
// Elements
var $start   = $('.start');
var $reset = $('.reset');
var $dice    = $('.dice');
var $turnDisplay = $('.turnDisplay');
var $bottomDisplay = $('.bottomDisplay');
var $board = $('.board');
var cells = $('.cell');//originally is renderjsboard func

// Constants

var player1= 1;
var player2= 2;
var player1icon;
var player2icon;

// Models
var resetVal = true; //this has to be true for topDisplay to be set
var diceval = null;

var  win= undefined;

var player1Current = 0;
var player2Current = 0;

var  playerTurn= player1;
var moveme;

//calling the draw function o set up my game
draw();
//call initialize
initializeModels();
//call the startGame func to allow starting game
startGame();
//call resetGame
resetGame();

function initializeModels () {
  //return to starting Game model
  player1Current = 0;
  player2Current = 0;
  //return to starting Game model
  diceval = null;
  win = false;
};//---------func is working----------

//this func is called when the dice is rolled
//and player position is updated/ turn is complete
function updateTurn(){
  player1=1;
  player2=2;
  //This func should update the current player's turn
  //function should be called at the end of each turn
  //each turn ends when dice is rolled and player position is updated
    if(win==true){
      if (playerTurn === player1) {
        playerTurn = player1
      }
      else{
        playerTurn = player2
      }
    }else if (playerTurn === player1) {
      playerTurn = player2
    }
   else{
    playerTurn = player1
    }
    //when player turn changes call draw to render changes
    draw();
};   /*------------------Func is Working!!----------------------*/

//This func is called in rollDice func
//after diceval has been generated
function playerPosition(){
    if (playerTurn === player1) {
      //retreive index value and add

      player1Current = player1Current + diceval
      // player1Current.text(player1)
      //new diceval to index # creating a new
      //board[i] position
    }else if (playerTurn === player2) {
      //retreive index value and ad
      player2Current = player2Current + diceval

      // player2Current.text(player2)
      //new diceval to index # creating a new
      //board[i] position
    }
    //for statement did not work here!
    if(player2Current>28 || player1Current>28) {
      winCheck();
    }
    // clearCells-func is being called properly
    clearCells()

    renderjsBoard();//originally first thing in draw!!
     //Warp is working!
    Warp(player1Current);
    Warp(player2Current);
}; /*------------------func is Working!!----------------------*/


//to generate diceval value
function randomDiceVal(){
  /* create a random # from 1-4 */
  return Math.floor((Math.random() * 4) + 1);
};/*------------------func is working!!----------------------*/

function rollDice(){
  console.log('rollDice has been called');
  //attach a click handler to dice
  $dice.click(function(event) {
    //random # from 1-4 is Generated
    //the number generated should be turned into a value variable diceval.
    diceval = randomDiceVal();
    updateTurn();
    changeDiceFace();
    playerPosition();

    //update turn for next player at the end of
    draw();
    console.log('dice was rolled to value ' + diceval);
  });
}; /*------------------func is Working!!----------------------*/

function startGame(){
  console.log('Ready to start game');
  $start.click(function(event) {
    console.log('game started');
    //testing
    sweetAlert("Save humanity", "Get to planet Senka!");
    //reset is set to false
    resetVal = false;
    // add event listener to Dice
    //maybe do so by calling the rolldice function only here
    rollDice();
    //display starting text and player position
    draw();
    $start.off('click');
  });
}; /*------------------func is working----------------------*/

function draw(){
  if(win===true){
    //turnDisplay text will say  the winner
    if(playerTurn===player1){
      $turnDisplay.text( "Player 2 is the winner!");
    }else if(playerTurn===player2){
    $turnDisplay.text( "Player 1 is the winner!");
    }
    $bottomDisplay.text("Winner!");
  }else if (resetVal === true){
    //When reset
    //turnDisplay text will return to "An adventure through time!"
    $turnDisplay.text("An adventure through space!");
    //bottomDisplay will return to "Start the game!"
    $bottomDisplay.text("Start the game!");
    $bottomDisplay.text("");
    //put player in starting position
    initializeModels();
  }else{
    //change bottomDisplay text to "Roll the Dice!"
    //when new player's turn
    $bottomDisplay.text("Roll the Dice!");
    //When player turn changes change turn display
    setTimeout(function () {
    if (playerTurn=== player1) {
      $turnDisplay.text(  "Player 1's turn!");
    }else if (playerTurn=== player2) {
    $turnDisplay.text("Player 2's turn!");
    }else{
      $turnDisplay.text("Player 1's turn!");
    }
    }, 500);
    // The dice background img should change to equal number generated
    changeDiceFace();
  };
}; /*------------------ready for testing----------------------*/

function changeDiceFace(){
  if (diceval === 1) {
    $dice.css({
      "background-image": 'url(assets/images/d1.png)'
    });
  }else if (diceval === 2) {
    $dice.css({
      "background-image": 'url(assets/images/d2.png)'
    });
  }else if (diceval === 3) {
    $dice.css({
      "background-image": 'url(assets/images/d3.png)'
    });
  }else if (diceval === 4) {
    $dice.css({
      "background-image": 'url(assets/images/d4.png)'
    });
  }
};//---------------func is working-----------

function resetGame(){
  //reset all values to starting values
  $reset.click(function(event) {
    //set reset to true
    $dice.off('click'); //testing
    resetVal = true;
    win = false;
    playerTurn = player1
    player1Current = 0
    player2Current = 0
    player1icon;
    player2icon;
    clearCells();
    startGame();
    draw();
    console.log('Game has been reset');
  });
}; /*------------------func is working----------------------*/

//check for win
function winCheck(){
  if (player1Current > 28 || player2Current > 28){
    swal({title: "You've saved humanity!",text: " Welcome to planet Senka!"});
    win = true;
    draw();
    $dice.off('click');
  }
};/*--------func is working-----------*/
function renderjsBoard(){
  player1icon = "<img class='icon' src='assets/images/p1.png' />";
  player2icon = "<img class='icon' src='assets/images/p2.png' />";
  //this loop should stop when cells no longer available
  //instead it is breaking"canot set texcontent of undefined"
  for(i = 0; i < cells.length; i++){
      if (player1Current === player2Current) {
      cells[player1Current].innerHTML = player1icon + player2icon;
    }else if (player1Current > 28 || player2Current > 28) {
      draw();
    }else{
      cells[player1Current].innerHTML = player1icon
      cells[player2Current].innerHTML = player2icon
    }
  }
};//-----------------func is working---------
//--------------------------add the Warps!!!----------------------
function Warp(current){
  var message = {title: 'Turbulence',text: 'Space warp has been activated'};
  setTimeout(function () {
    switch(current) {
      //Warps-sending players backwards
      case 6:
          moveme = 1
          swal(message);
          break;
      case 11:
          moveme = 4
          swal(message);
          break;
      case 16:
          moveme = 7
          swal(message);
          break;
      case 21:
          moveme = 13
          swal(message);
          break;
      case 27:
          moveme = 20
          swal(message);
          break;
      //warps-sending players forward
      case 5:
          moveme = 10
          swal(message);
          break;
      case 12:
          moveme = 18
          swal(message);
          break;
      case 19:
          moveme = 22
          swal(message);
          break;
      default:
          moveme = current
    }
    if (current === player1Current) {
     player1Current = moveme
    }else if (current === player2Current) {
      player2Current = moveme
    }
    clearCells()
    renderjsBoard();//originally first thing in draw!!
  }, 500);
};
//------------------Clearing cells-Func is working-----------------
function clearCells(){
  console.log('clearing cells');
  for (var i = 0; i < cells.length; i++) {
    if(i !== player1Current && i !== player2Current){
      console.log(i === player1Current);
      cells[i].textContent = '';
    }
  }
};


