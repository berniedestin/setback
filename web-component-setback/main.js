import "./components/grid-box.js";
import "./components/dice-roller.js";
import "./components/travel-space.js";
import "./components/home-space.js";
import "./components/victory-space.js";
import "./components/turn-options.js";
import "./components/start-menu.js";
//import { Board } from "./models/board.js";
import { board } from "./models/board.js";
import { Player } from "./models/player.js";

//const board = new Board();
//const players = new Map();
//players.set("red", "green");
//players.set("green", "yellow");
//players.set("yellow", "blue");
//players.set("blue", "red");

//const players = [
//  new Player(true, "red"),
//  new Player(true, "green"),
//  new Player(true, "yellow"),
//  new Player(true, "blue"),
//];
//const turnButton = document.getElementById("turn-button");

//const diceRoller = document.querySelector("dice-roller"); // Maybe should be in board
//const homeSpaces = document.querySelectorAll("home-space");
//const victorySpaces = document.querySelectorAll("victory-space");
//const travelSpaces = document.querySelectorAll("travel-space");

// Mostly for debug
const container = document.querySelector("main");
const gridLayout = document.querySelector("#grid-layout");
const startMenu = document.querySelector("start-menu");
//const turnOptions = document.querySelector("turn-options");

container.addEventListener("game-prepped", (e) => {
  // Game is prepped to show board and begin button
  //console.log(e.detail.players);
  console.log("Game Prepped");
  startMenu.style.display = "none";
  gridLayout.style.display = "grid";
  board.turnOptions.style.display = "block";
  board.players = e.detail.players;
  board.currentPlayer = board.players.find((player) => player.color == "red");
});
container.addEventListener("game-start", (e) => {
  if (e.detail.gameStart) {
    board.isGameStarted = true;
    board.diceRoller.enableClick();
    console.log("Game Started");
    console.log(board.players);
    // check for bot, resolve
    if (!board.currentPlayer.isHuman) {
      console.log(`Bot should CLICK DICE ROLLER`);
      setTimeout(
        board.currentPlayer.bot.clickDiceRoller,
        board.currentPlayer.bot.waitTimeMili,
      );
    }
  }
});
container.addEventListener("next-turn", (e) => {
  console.log(`!!!!!!! NEXT TURN EVENT FIRED !!!!!!!!`);
  if (board.isWinner) {
    return;
  }
  if (e.detail.previousPlayer) {
    board.canRollAgain = true;
    board.landedOnDouble = false;
    board.diceRoller.enableClick();
    //let nextPlayer = board.players.get(e.detail.previousPlayer);
    let nextPlayer = board.players.find(
      (player) => player.color == e.detail.previousPlayer.nextColor,
    );
    /*
    console.log(nextPlayer);
    console.log(board.currentPlayer);
    */
    console.log(
      `Next Turn. Previous Player: ${e.detail.previousPlayer.name}, Next Player: ${nextPlayer.name}`,
    );
    board.turnOptions.nextPlayer(nextPlayer);
    board.currentPlayer = nextPlayer;

    console.log(`VV NextPlayer VV`);
    console.log(board.currentPlayer);
    // bot logic
    if (!board.currentPlayer.isHuman) {
      console.log(`Bot should CLICK DICE ROLLER`);
      setTimeout(
        board.currentPlayer.bot.clickDiceRoller,
        board.currentPlayer.bot.waitTimeMili,
      );
    }
  } else {
    console.log(`Something went wrong with the next-turn event. ${e}`);
  }
});
container.addEventListener("select-piece", (e) => {
  console.log(`!!!!!!! SELECT PIECE EVENT FIRED !!!!!!!!`);
  if (board.isWinner) {
    return;
  }
  //console.log(`Location: ${e.detail.pieceLocation}`);
  //console.log(`Number: ${e.detail.spaceNumber}`);
  // if location is home, take from home row
  if (e.detail.pieceLocation == "home") {
    board.removeFromHome(e.detail.spaceNumber);
  }
  // if location is track, do normal movement
  if (e.detail.pieceLocation == "track") {
    board.makeMove(e.detail.spaceNumber);
  }

  // if location is vitory, do special move
  //

  board.lockAllPieces();

  // reset choice array for bot
  board.choices = [];

  board.victoryConditionMet();
  if (!board.isWinner) {
    // if 6 or double roll, let roll again
    if (
      (board.diceRoller.diceRoll == 6 || board.landedOnDouble) &&
      board.canRollAgain
    ) {
      board.diceRoller.enableClick();
      board.turnOptions.playerMessage(`You can roll again, please roll!`);
      board.canRollAgain = false;
      board.choices = [];
      // bot logic
      if (!board.currentPlayer.isHuman) {
        console.log(`Bot should CLICK DICE ROLLER`);
        setTimeout(
          board.currentPlayer.bot.clickDiceRoller,
          board.currentPlayer.bot.waitTimeMili,
        );
      }
    } else {
      board.turnOptions.activateNextTurnButton();
      // bot logic
      if (!board.currentPlayer.isHuman) {
        console.log(`Bot should CLICK NEXT TURN`);
        setTimeout(
          board.currentPlayer.bot.clickNextTurn,
          board.currentPlayer.bot.waitTimeMili,
        );
      }
    }
  }
});
container.addEventListener("dice-rolled", (e) => {
  console.log(`!!!!!!! DICE ROLLED EVENT FIRED !!!!!!!!`);
  if (board.isWinner) {
    return;
  }
  if (!board.isGameStarted) {
    console.log("somehow we left early");
    return;
  }

  board.getOptions();

  // chech for bot
  if (!board.currentPlayer.isHuman) {
    if (board.choices.length == 0) {
      console.log(`Bot should CLICK NEXT TURN`);
      setTimeout(
        board.currentPlayer.bot.clickNextTurn,
        board.currentPlayer.bot.waitTimeMili,
      );
    } else {
      console.log(`Bot should DECIDE --- ${board.currentPlayer.bot.type}`);
      //console.log(board.currentPlayer.bot);
      console.log(board.choices);
      setTimeout(
        board.currentPlayer.bot.decide,
        board.currentPlayer.bot.waitTimeMili,
      );
      console.log(board.choices);
    }
  }
  container.addEventListener("game-reset", (e) => {
    if (e.detail.resetGame) {
      board.isGameStarted = false;
      board.isWinner = false;
      console.log("Game Reset");
      board.reset();
      startMenu.reset();
      startMenu.style.display = "block";
      gridLayout.style.display = "none";
      board.turnOptions.style.display = "none";
    }
  });

  //board.turnOptions.playerMessage(
  //  `You rolled: ${board.diceRoller.diceRoll}| HomeCountRed: ${board.victoryCount("red")}`,
  //);
  // present player with choices, generate with Board, display in TurnOptions
  // It would be nice to disable the ability to roll the dice until the player has made a selection
});

// Roll > SelectMove >
//                   || Roll > SelectMove > NextPlayer

// TurnOption should be something like:
// TurnOption {
//    color
//    from
//    to
// }

//document.addEventListener()
//turnButton.addEventListener("click", () => {
//  board.diceRoller.roll();
//  let roll = board.diceRoller.diceRoll;

// test roll functionality
//  const newParagraph = document.createElement("p");
//  newParagraph.textContent = `Rolled: ${roll} | IDK`;
//  container.appendChild(newParagraph);
//});

// Turn function: needs to present player with choices
// function takeTurn(Player), could be method that takes dice roll?
// maybe setup list of players?
// need board state, global variable?
// need player class? This would contain AI for turn choice?
//    AI: start simple, always first choice, could refactor later to add variety

// LAYOUT 16x16:
//
//       HHHH
//        OO
//       OV O
//      O V  O
//     D  V   D
//    O   V    O
// H O          O H
// HO     TT VVVVOH
// HOVVVV TT     OH
// H O          O H
//    O    V   O
//     D   V  D
//      O  V O
//       O VO
//        OO
//       HHHH
//
// HomeSpace 1-4 for each color: takes color and number identifier
// VicotrySpace 1-4 for each color: takes color and number identifier
// TravelSpace maybe title by degree?? 45,135,225,315 would be roll again
