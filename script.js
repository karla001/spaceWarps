// Elements
var $start   = $('.start');
var $reset = $('.reset');
var $dice    = $('.dice');
var $turnDisplay = $('.turnDisplay');
var $bottomDisplay = $('.bottomDisplay');
var $board = $('.board');
var cells = $('.cell');//originally is renderjsboard func

// Constants

var player1 = 1;
var player2 = -1;

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
  setTimeout(function(){
    //this is showing the person who's turn it just became
    if (playerTurn === player2) {
      //retreive index value and add
      player1Current = player1Current + diceval
      // player1Current.text(player1)
      //new diceval to index # creating a new
      //board[i] position
    }else if (playerTurn === player1) {
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
  }, 600);
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
    //the player's var should be changed according to the value rolled
    playerPosition();
    changeDiceFace();
    //update turn for next player at the end of
    updateTurn();
    draw();
    console.log('dice was rolled to value ' + diceval);
  });
}; /*------------------func is Working!!----------------------*/

function startGame(){
  console.log('Ready to start game');
  $start.click(function(event) {
    console.log('game started');
    //reset is set to false
    resetVal = false;
    // add event listener to Dice
    //maybe do so by calling the rolldice function only here
    rollDice();
    //display starting text and player position
    draw();
  });
}; /*------------------func is working----------------------*/

function draw(){
  if(win===true){
    //turnDisplay text will say  the winner
    $turnDisplay.text( playerTurn + " is the winner!");
    //bottomDisplay will return to "Start the game!"
    $bottomDisplay.text("Winner!");
  }else if (resetVal === true){
    //When reset
    //turnDisplay text will return to "An adventure through time!"
    $turnDisplay.text("An adventure through time!");
    //bottomDisplay will return to "Start the game!"
    $bottomDisplay.text("Start the game!");
    //put player in starting position
    initializeModels();
  }else{
    //change bottomDisplay text to "Roll the Dice!"
    //when new player's turn
    $bottomDisplay.text("Roll the Dice!");
    //When player turn changes change turn display
    $turnDisplay.text( playerTurn + "'s turn!");
    // The dice background img should change to equal number generated
    changeDiceFace();
  };
}; /*------------------ready for testing----------------------*/

function changeDiceFace(){
  if (diceval === 1) {
    $dice.css({
      "background-image": 'url(assets/d1.png)'
    });
  }else if (diceval === 2) {
    $dice.css({
      "background-image": 'url(assets/d2.png)'
    });
  }else if (diceval === 3) {
    $dice.css({
      "background-image": 'url(assets/d3.png)'
    });
  }else if (diceval === 4) {
    $dice.css({
      "background-image": 'url(assets/d4.png)'
    });
  }
};//---------------func is working-----------

function resetGame(){
  //reset all values to starting values
  $reset.click(function(event) {
    //set reset to true
    resetVal = true;
    win = false;
    player1Current =0
    player2Current =0
    clearCells();
    draw();
    console.log('Game has been reset');
  });
}; /*------------------func is working----------------------*/

//check for win
function winCheck(){
  if (player1Current > 28 || player2Current > 28){
    win = true;
    draw();
    alert("You've won!");
    $dice.off('click');
  }
};/*--------func is working-----------*/
function renderjsBoard(){
  //this loop should stop when cells no longer available
  //instead it is breaking"canot set texcontent of undefined"
  for(i = 0; i < cells.length; i++){
      if (player1Current === player2Current) {
      cells[player1Current].textContent = player1 + player2;
    }else if (player1Current > 28 || player2Current > 28) {
      draw();
    }else{
      cells[player1Current].textContent = player1
      cells[player2Current].textContent = player2
    }
  }
};//-----------------func is working---------
//--------------------------add the Warps!!!----------------------
function Warp(current){
  setTimeout(function () {
    switch(current) {
      //Warps-sending players backwards
      case 6:
          moveme = 1
          alert('Warp has been activated');
          break;
      case 11:
          moveme = 4
          alert('Warp has been activated');
          break;
      case 16:
          moveme = 7
          alert('Warp has been activated');
          break;
      case 21:
          moveme = 13
          alert('Warp has been activated');
          break;
      case 27:
          moveme = 20
        alert('Warp has been activated');
        break;
      //warps-sending players forward
      case 5:
          moveme = 10
          alert('Warp has been activated');
          break;
      case 15:
          moveme = 18
          alert('Warp has been activated');
          break;
      case 19:
          moveme = 22
          alert('Warp has been activated');
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


