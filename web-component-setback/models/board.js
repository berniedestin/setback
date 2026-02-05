//import { TurnResult } from "./turn-result";
import { TurnChoice } from "./turn-choice.js";

class Board {
  //export class Board {
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

    this.players = []; /*new Map();
    this.players.set("red", "green");
    this.players.set("green", "yellow");
    this.players.set("yellow", "blue");
    this.players.set("blue", "red");
    */

    //this.currentPlayer = "red";
    this.canRollAgain = true;
    this.landedOnDouble = false;

    this.choices = [];
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
  lockAllPieces() {
    this.homeSpaces.forEach((space) => {
      space.disableClick();
    });
    this.travelSpaces.forEach((space) => {
      space.disableClick();
    });
    // need to do the same for victory spaces
  }
  unlockValidMoves() {
    this.choices = [];
    /*
    console.log(
      `Got inside unlock valid moves for color ${this.currentPlayer.color}`,
    );
    */
    let unlockCount = 0;

    // create TurnChoice array
    let willTakePiece = false;

    let startSpaceFree = true;
    let startSpace = this._redStart;
    if (this.currentPlayer.color == "green") {
      startSpace = this._greenStart;
    } else if (this.currentPlayer.color == "yellow") {
      startSpace = this._yellowStart;
    } else if (this.currentPlayer.color == "blue") {
      startSpace = this._blueStart;
    }
    this.travelSpaces.forEach((space) => {
      if (
        space.spaceNumber == startSpace &&
        space.getAttribute("occupied") == this.currentPlayer.color
      ) {
        startSpaceFree = false;
      } else if (
        space.spaceNumber == startSpace &&
        space.getAttribute("occupied") != "white"
      ) {
        willTakePiece = true;
      }
    });

    // unlock all home if dice roll is 1 or 6
    if (
      (this.diceRoller.diceRoll == 1 || this.diceRoller.diceRoll == 6) &&
      startSpaceFree
    ) {
      this.homeSpaces.forEach((space) => {
        if (
          space.getAttribute("owner") == this.currentPlayer.color &&
          space.getAttribute("occupied") == this.currentPlayer.color
        ) {
          space.enableClick();
          this.choices.push(
            new TurnChoice(
              this.currentPlayer.color,
              space.spaceNumber,
              true,
              29,
              willTakePiece,
              false,
            ),
          );
          unlockCount++;
        }
      });
    }
    // unlock all others that wouldn't land on your own piece and wouldn't exceed the victory row
    this.travelSpaces.forEach((space) => {
      if (
        space.getAttribute("occupied") == this.currentPlayer.color &&
        this.checkValidMove(space.spaceNumber)
      ) {
        space.enableClick();
        this.choices.push(
          new TurnChoice(
            this.currentPlayer.color,
            space.spaceNumber,
            false,
            28 - this.getNormalizedNumber(space.spaceNumber),
            this.wouldLandOnPiece(space.spaceNumber),
            this.wouldLandOnEntrance(space.spaceNumber),
          ),
        );
        unlockCount++;
      }
    });

    if (unlockCount == 0) {
      console.log(
        `--There are no options! Choice count is:${this.choices.length}`,
      );
      this.turnOptions.playerMessage(
        `You rolled: ${this.diceRoller.diceRoll}, but there are no valid moves!`,
      );
      this.turnOptions.activateNextTurnButton();
    } else {
      console.log(
        `--There are some options! Choice count is:${this.choices.length}`,
      );
    }
  }
  getNormalizedNumber(number) {
    let normalizedNumber = 0;
    if (this.currentPlayer.color == "red") {
      normalizedNumber = number;
    } else if (this.currentPlayer.color == "green") {
      if (number <= this._greenVictory) {
        normalizedNumber = number + 28 - this._greenVictory;
      } else {
        normalizedNumber = number - this._greenVictory;
      }
    } else if (this.currentPlayer.color == "yellow") {
      if (number <= this._yellowVictory) {
        normalizedNumber = number + 28 - this._yellowVictory;
      } else {
        normalizedNumber = number - this._yellowVictory;
      }
    } else if (this.currentPlayer.color == "blue") {
      if (number <= this._blueVictory) {
        normalizedNumber = number + 28 - this._blueVictory;
      } else {
        normalizedNumber = number - this._blueVictory;
      }
    }
    return normalizedNumber;
  }
  checkValidMove(number) {
    let isValid = true;
    let endSpace = 28;
    let normalizedNumber = this.getNormalizedNumber(number);

    // invalid if

    // would exceed end space + 4
    if (normalizedNumber + this.diceRoller.diceRoll > endSpace + 4) {
      isValid = false;
      return isValid;
    }
    // would land on occupied space in victory row
    if (normalizedNumber + this.diceRoller.diceRoll > endSpace) {
      let victorySpace = normalizedNumber + this.diceRoller.diceRoll - endSpace;
      this.victorySpaces.forEach((space) => {
        if (
          space.getAttribute("owner") == this.currentPlayer.color &&
          space.getAttribute("occupied") == this.currentPlayer.color &&
          space.spaceNumber == victorySpace
        ) {
          isValid = false;
        }
      });
      return isValid;
    }
    // would land on same color
    this.travelSpaces.forEach((space) => {
      if (
        space.spaceNumber == number + this.diceRoller.diceRoll &&
        space.getAttribute("occupied") == this.currentPlayer.color
      ) {
        // console.log(`Would Land on same color. From Space #${number}`);
        isValid = false;
        return isValid;
      }
    });
    return isValid;
  }
  wouldLandOnPiece(number) {
    let wouldLandOnPiece = false;

    let endSpace = 28;
    let normalizedNumber = this.getNormalizedNumber(number);

    // because we know this will be a valid move,
    // we just need to check that the move amount won't exceed
    // the travel spaces into the victory row
    // which would make landing on another color impossible
    if (normalizedNumber + this.diceRoller.diceRoll > 28) {
      return wouldLandOnPiece;
    }

    // would land on different color
    this.travelSpaces.forEach((space) => {
      if (
        space.spaceNumber == number + this.diceRoller.diceRoll &&
        space.getAttribute("occupied") != this.currentPlayer.color &&
        space.getAttribute("occupied") != "white"
      ) {
        // console.log(`Would Land on same color. From Space #${number}`);
        wouldLandOnPiece = true;
        return wouldLandOnPiece;
      }
    });
    return wouldLandOnPiece;
  }
  wouldLandOnEntrance(number) {
    let wouldLandOnEntrance = false;

    let endSpace = 28;
    let normalizedNumber = this.getNormalizedNumber(number);

    // because we know this will be a valid move,
    // we just need to check that the move amount won't exceed
    // the travel spaces into the victory row
    // which would make landing on another color impossible
    if (normalizedNumber + this.diceRoller.diceRoll > 28) {
      return wouldLandOnEntrance;
    }

    if (
      number + this.diceRoller.diceRoll == this._redStart ||
      number + this.diceRoller.diceRoll == this._greenStart ||
      number + this.diceRoller.diceRoll == this._yellowStart ||
      number + this.diceRoller.diceRoll == this._blueStart
    ) {
      wouldLandOnEntrance = true;
    }
    return wouldLandOnEntrance;
  }
  removeFromHome(number) {
    // logic to remove one from color's home
    // code that calls this function must verify that home row has pieces to move
    //
    // make home space white
    this.homeSpaces.forEach((space) => {
      if (
        space.getAttribute("owner") == this.currentPlayer.color &&
        space.spaceNumber == number
      ) {
        space.setAttribute("occupied", "white");
      }
    });

    // set correct first space for each color
    let firstSpace = 0;
    if (this.currentPlayer.color == "red") {
      firstSpace = this._redStart;
    } else if (this.currentPlayer.color == "green") {
      firstSpace = this._greenStart;
    } else if (this.currentPlayer.color == "yellow") {
      firstSpace = this._yellowStart;
    } else if (this.currentPlayer.color == "blue") {
      firstSpace = this._blueStart;
    }

    // check if destination is occupied, send back home
    this.travelSpaces.forEach((space) => {
      if (
        space.spaceNumber == firstSpace &&
        space.getAttribute("occupied") != "white"
      ) {
        let oldColor = space.getAttribute("occupied");
        this.addToHome(oldColor);
      }
    });

    // make new space player color
    this.travelSpaces.forEach((space) => {
      if (space.spaceNumber == firstSpace) {
        space.setAttribute("occupied", this.currentPlayer.color);
      }
    });
  }
  addToHome(color) {
    //console.log(`AddToHome called for color: ${color}`);
    let addedSuccessfully = false;
    // logic to add piece back to color's home row after being landed on
    this.homeSpaces.forEach((space) => {
      if (
        !addedSuccessfully &&
        space.getAttribute("owner") == color &&
        space.getAttribute("occupied") == "white"
      ) {
        space.setAttribute("occupied", color);
        addedSuccessfully = true;
      }
    });
    // code that calls this function must verify that home row is not already full
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
      this.homeCount(this.currentPlayer.color) == 4
    ) {
      //console.log(`Roll: ${this.diceRoller.diceRoll}`);
      //console.log(`Home Count: ${this.homeCount(this.currentPlayer)}`);
      // turn options message
      this.turnOptions.playerMessage(
        `You rolled: ${this.diceRoller.diceRoll}, you have no moves available!`,
      );
      // activate next turn, this should be in the layer above
      this.turnOptions.activateNextTurnButton();
      return;
    }
    // if 1 or 6 and have full home row and empty inital space, put one out
    if (
      (this.diceRoller.diceRoll == 6 || this.diceRoller.diceRoll == 1) &&
      this.homeCount(this.currentPlayer.color) > 0
    ) {
      // allow player to click on occupied spaces in home row
      this.turnOptions.playerMessage(
        `You rolled: ${this.diceRoller.diceRoll}, please select a piece to move!`,
      );
      this.unlockValidMoves();
    }

    // this means at least one is out
    if (this.homeCount(this.currentPlayer.color) < 4) {
      this.turnOptions.playerMessage(
        `You rolled: ${this.diceRoller.diceRoll}, please select a piece to move!`,
      );
      this.unlockValidMoves();
    }

    // if land on occupied space, will send color back home
    //
    // if 6 and firstRoll, roll again
    // if landed on double space and firstRoll roll again
  }
  makeMove(number) {
    let normalizedNumber = this.getNormalizedNumber(number);
    if (normalizedNumber + this.diceRoller.diceRoll > 28) {
      // do something to put pice into victory row
      let victoryNumber = normalizedNumber + this.diceRoller.diceRoll - 28;
      this.victorySpaces.forEach((space) => {
        if (
          space.getAttribute("owner") == this.currentPlayer.color &&
          space.getAttribute("occupied") == "white" &&
          space.spaceNumber == victoryNumber
        ) {
          space.setAttribute("occupied", this.currentPlayer.color);
        }
      });

      // remove piece
      this.travelSpaces.forEach((space) => {
        if (space.spaceNumber == number) {
          space.setAttribute("occupied", "white");
        }
      });

      return;
    }

    // remove from current spot
    this.travelSpaces.forEach((space) => {
      if (space.spaceNumber == number) {
        space.setAttribute("occupied", "white");
      }
    });
    // set occupied, send home if already occupied by other color, set double roll spot
    let newSpaceNumber =
      number + this.diceRoller.diceRoll > 28
        ? number + this.diceRoller.diceRoll - 28
        : number + this.diceRoller.diceRoll;

    this.travelSpaces.forEach((space) => {
      if (space.spaceNumber == newSpaceNumber) {
        if (space.isDoubleSpace) {
          this.landedOnDouble = true;
        }
        if (space.getAttribute("occupied") != "white") {
          // this should only trigger for not current color
          this.addToHome(space.getAttribute("occupied"));
        }
        space.setAttribute("occupied", this.currentPlayer.color);
      }
    });
  }
  victoryConditionMet() {
    let winner = this.victoryCount(this.currentPlayer.color) == 4;
    if (winner) {
      this.isWinner = true;
      this.turnOptions.victory(this.currentPlayer);
    }
  }
}

export const board = new Board();
