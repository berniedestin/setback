import "./components/grid-box.js";
import "./components/dice-roller.js";
import "./components/travel-space.js";
import "./components/home-space.js";
import "./components/victory-space.js";
import "./components/turn-options.js";
import { Board } from "./models/board.js";
import { Player } from "./models/player.js";

const board = new Board();
const players = new Map();
players.set("red", "green");
players.set("green", "yellow");
players.set("yellow", "blue");
players.set("blue", "red");

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

container.addEventListener("game-start", (e) => {
  if (e.detail.gameStart) {
    board.isGameStarted = true;
    board.diceRoller.enableClick();
    console.log("Game Started");
  }
});
container.addEventListener("dice-rolled", (e) => {
  if (!board.isGameStarted) {
    console.log("somehow we left early");
    return;
  }
  board.turnOptions.playerMessage(
    `You rolled: ${board.diceRoller.diceRoll}| HomeCountRed: ${board.victoryCount("red")}`,
  );
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
