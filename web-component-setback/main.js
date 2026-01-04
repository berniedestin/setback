import "./components/grid-box.js";
import "./components/dice-roller.js";
import "./components/travel-space.js";
import "./components/home-space.js";
import "./components/victory-space.js";

const turnButton = document.getElementById("turn-button");
const diceRoller = document.querySelector("dice-roller");

const container = document.querySelector("main");

turnButton.addEventListener("click", () => {
  diceRoller.roll();
  let roll = diceRoller.diceRoll;

  // test roll functionality
  const newParagraph = document.createElement("p");
  newParagraph.textContent = `Rolled: ${roll}`;
  container.appendChild(newParagraph);
});
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
