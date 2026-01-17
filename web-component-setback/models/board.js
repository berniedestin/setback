//import { TurnResult } from "./turn-result";

export class Board {
  constructor() {
    this.homeSpaces = document.querySelectorAll("home-space");
    this.victorySpaces = document.querySelectorAll("victory-space");
    this.travelSpaces = document.querySelectorAll("travel-space");
    this.diceRoller = document.querySelector("dice-roller");

    this.turnOptions = document.querySelector("turn-options");

    this._redStart = 1;
    this._greenStart = 8;
    this._yellowStart = 15;
    this._blueStart = 22;

    this._redVictory = 28;
    this._greenVictory = 7;
    this._yellowVictory = 14;
    this._blueVictory = 21;

    this.isWinner = false;
    this.isGameStarted = false;
    this.currentPlayer = "red";
  }
  homeCount(color) {
    let count = 0;
    this.homeSpaces.forEach((home) => {
      if (home.getAttribute("occupied") == color) {
        count++;
      }
    });
    return count;
  }
  victoryCount(color) {
    let count = 0;
    this.victorySpaces.forEach((victory) => {
      if (victory.getAttribute("occupied") == color) {
        count++;
      }
    });
    return count;
  }
  getOptions(player, diceRoll, canRollAgain) {
    let choices = [];
    //
    // present choices? as TurnResult.choices array
    //
    // if 1 or 6 and have full home row and empty inital space, put one out
    if ((diceRoll == 6 || diceRoll == 1) && homeCount(player) > 0) {
      choices.push({ from: "home", to: 1 });
    }
    // if land on occupied space, will send color back home
    //
    // if 6 and firstRoll, roll again
    // if landed on double space and firstRoll roll again
  }
}
