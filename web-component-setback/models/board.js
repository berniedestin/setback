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

    this.players = new Map();
    this.players.set("red", "green");
    this.players.set("green", "yellow");
    this.players.set("yellow", "blue");
    this.players.set("blue", "red");

    this.currentPlayer = "red";
    this.canRollAgain = true;
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
  removeFromHome(color) {
    // logic to remove one from color's home
    // code that calls this function must verify that home row has pieces to move
  }
  addToHome(color) {
    // logic to add piece back to color's home row after being landed on
    // cod that calls this function must verify that home row is not already full
  }
  getOptions() {
    //let choices = [];
    //
    // present choices? as TurnResult.choices array
    //

    // if not 1 or 6 and home row count is 4, then advance to next turn
    if (
      this.diceRoller.diceRoll != 6 &&
      this.diceRoller.diceRoll != 1 &&
      this.homeCount(this.currentPlayer) == 4
    ) {
      //console.log(`Roll: ${this.diceRoller.diceRoll}`);
      //console.log(`Home Count: ${this.homeCount(this.currentPlayer)}`);
      // turn options message
      this.turnOptions.playerMessage(
        `You rolled: ${this.diceRoller.diceRoll}, you have no moves available!`,
      );
      // activate next turn
      this.turnOptions.activateNextTurnButton();
      return;
    }
    // if 1 or 6 and have full home row and empty inital space, put one out
    if (
      (this.diceRoller.diceRoll == 6 || this.diceRoller.diceRoll == 1) &&
      this.homeCount(this.currentPlayer) > 0
    ) {
      // allow player to click on occupied spaces in home row
      this.turnOptions.playerMessage(
        `You rolled: ${this.diceRoller.diceRoll}, please select a piece to move!`,
      );
    }

    //if (this.homeCount(this.currentPlayer) )
    // if land on occupied space, will send color back home
    //
    // if 6 and firstRoll, roll again
    // if landed on double space and firstRoll roll again
  }
  makeMove(color, turnChoice) {
    // logic that takes the from and to with the color being
  }
}
