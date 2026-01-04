import "./components/grid-box.js";
import "./components/dice-roller.js";
import "./components/travel-space.js";
import "./components/home-space.js";
import "./components/victory-space.js";
import { Board } from "./models/board.js";
import { Player } from "./models/player.js";

const board = new Board();
const players = [
  new Player(false, "red"),
  new Player(false, "green"),
  new Player(false, "yellow"),
  new Player(true, "blue"),
];
const turnButton = document.getElementById("turn-button");
//const diceRoller = document.querySelector("dice-roller"); // Maybe should be in board
//const homeSpaces = document.querySelectorAll("home-space");
//const victorySpaces = document.querySelectorAll("victory-space");
//const travelSpaces = document.querySelectorAll("travel-space");

// Mostly for debug
const container = document.querySelector("main");

turnButton.addEventListener("click", () => {
  board.diceRoller.roll();
  let roll = board.diceRoller.diceRoll;

  // test roll functionality
  const newParagraph = document.createElement("p");
  newParagraph.textContent = `Rolled: ${roll} | IDK`;
  container.appendChild(newParagraph);
});

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
