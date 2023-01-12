// Figure out state~
let state = {};
//Establish variables to be used throughout the game
const cells = document.querySelectorAll(".cell");
const gameUpdates = document.querySelector("#gameUpdates");
const reset = document.querySelector("#resetBtn"); //set up for building reset button
const playerTurnElem = document.querySelector("#player-turn"); //Sean used this to establish p1 &p1 inputs

const winnerWinner = [
  //like steven's matrix; these "coordinates" map the possible wins
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

let spaces = ["", "", "", "", "", "", "", "", ""]; //"map" of empty spaces/conditions for winner check

let currentPlayer = "X"; //try this just to establish a "player name"; change to player input later

function setPlayerName() {
  let player1Name = document.getElementById("player1-name");
  player1Name.innerHTML = document.getElementById("player1NameInput").value;
  player1Name.innerHTML += " VS ";
  document.getElementById("set1-name").style.display = "none";
  let player2Name = document.getElementById("player2-name");
  player2Name.innerHTML = document.getElementById("player2NameInput").value;
  player2Name.innerHTML += "";
  document.getElementById("set2-name").style.display = "none";
}

let gameOn = false; //game remains "off" until gameOn = true AKA start game

startGame(); //start off by invoking the startGame function to actually start the game!

function startGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  reset.addEventListener("click", resetGame);
  gameUpdates.textContent = `${currentPlayer}'s turn`; //using .textContent bc .innerTextHtml is eluding me
  gameOn = true; //this starts the game after ^^^click event
}
function changePlayer() {
  //had to place this outside of renderPlayer bc i couldnt get it to function
  currentPlayer = currentPlayer == "X" ? "O" : "X"; //no name imputs now so reverting to "X" & "O" names
  gameUpdates.textContent = `It's ${currentPlayer}'s turn`;
}

function updateCell(cell, index) {
  spaces[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex"); //this-keyword getting value of cellIndex class
  if (spaces[cellIndex] != "" || !gameOn) {
    //if blank space is filled, game is running
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function checkWinner() {
  let chickenDinner = false;

  for (let i = 0; i < winnerWinner.length; i++) {
    //iterate through winnerWinner array conditions
    const condition = winnerWinner[i]; //winning conditions @ index array

    const rowA = spaces[condition[0]]; //each row has three indexes; if first row all three spaces match: winner
    const rowB = spaces[condition[1]]; //if not, continue to next row condition, etc
    const rowC = spaces[condition[2]];

    if (rowA === "" || rowB === "" || rowC === "") {
      //if rowA still has empty spaces, cont, etc.
      continue;
    }

    if (rowA === rowB && rowB === rowC) {
      //using a sort of Pythagorean theorem here to break for winning sequence

      chickenDinner = true;
      break;
    }
  }
  if (chickenDinner) {
    gameUpdates.textContent = `${currentPlayer} is the winner!`; //again couldnt figure out innertextHtml to use here
    gameOn = false;
  } else if (!spaces.includes("")) {
    gameUpdates.textContent = `It's a draw!`;
    gameOn = false;
  } else {
    changePlayer(); //after all that, if none of those conditions were met, its next players turn
  }
}

function resetGame() {
  //possibly work the reset codes for p1 & p2 input from Sean's memory game?
  currentPlayer = "X";
  spaces = ["", "", "", "", "", "", "", "", ""]; //reset back to blanks
  gameUpdates.textContent = `${currentPlayer}'s turn`; //reset back to 1st X move
  cells.forEach((cell) => (cell.textContent = ""));
  gameOn = true;
}
