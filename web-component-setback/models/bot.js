import { board } from "./board.js";

export class Bot {
  constructor() {
    this._waitTimeMili = 1000;
    // maybe set type??
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber == 1) {
      this.type = "fast";
    } else if (randomNumber == 2) {
      this.type = "aggressive";
    } else if (randomNumber == 3) {
      this.type = "noneleft";
    }
  }
  get waitTimeMili() {
    return this._waitTimeMili;
  }
  decide() {
    /*
    console.log(`@@ DEBUG @@ Got inside decide`);
    console.log(
      `@@ DEBUG @@ Choice length: ${board.choices.length}; Type: ${board.currentPlayer.bot.type}`,
    );
    */
    // zero choices should be handled before this
    // method gets called

    // handle single choice
    if (board.choices.length == 1) {
      if (board.choices[0].fromHomeRow) {
        board.currentPlayer.bot.clickHomeSpace(board.choices[0]);
        return;
      } else {
        board.currentPlayer.bot.clickTravelSpace(board.choices[0]);
        return;
      }
    }

    let newChoiceOrder = board.currentPlayer.bot.#basicSort();

    // handle multiple choices based on personality
    if (board.currentPlayer.bot.type == "fast") {
      board.currentPlayer.bot.#fast(newChoiceOrder);
    } else if (board.currentPlayer.bot.type == "aggressive") {
      board.currentPlayer.bot.#aggressive(newChoiceOrder);
    } else if (board.currentPlayer.bot.type == "noneleft") {
      board.currentPlayer.bot.#noneleft(newChoiceOrder);
    }
  }
  #basicSort() {
    let newChoiceOrder = board.choices.sort((a, b) => {
      return a.distanceToVictory - b.distanceToVictory;
    });
    newChoiceOrder = newChoiceOrder.sort((a, b) => {
      if (
        (a.willLandOnEntrance && b.willLandOnEntrance) ||
        (!a.willLandOnEntrance && !b.willLandOnEntrance)
      ) {
        return 0;
      }
      if (a.willLandOnEntrance) {
        return 1;
      }
      if (b.willLandOnEntrance) {
        return -1;
      }
    });
    return newChoiceOrder;
  }
  #fast(choiceOrder) {
    //console.log(`@@ DEBUG @@ Got inside #fast`);
    let newChoiceOrder = choiceOrder.sort((a, b) => {
      return a.distanceToVictory - b.distanceToVictory;
    });
    if (newChoiceOrder[0].fromHomeRow) {
      board.currentPlayer.bot.clickHomeSpace(newChoiceOrder[0]);
    } else {
      board.currentPlayer.bot.clickTravelSpace(newChoiceOrder[0]);
    }
  }
  #aggressive(choiceOrder) {
    //console.log(`@@ DEBUG @@ Got inside #aggressive`);
    let newChoiceOrder = choiceOrder.sort((a, b) => {
      // if the same
      if (
        (a.willTakePiece && b.willTakePiece) ||
        (!a.willTakePiece && !b.willTakePiece)
      ) {
        return 0;
      }
      if (a.willTakePiece) {
        return -1;
      }
      if (b.willTakePiece) {
        return 1;
      }
    });
    if (newChoiceOrder[0].fromHomeRow) {
      board.currentPlayer.bot.clickHomeSpace(newChoiceOrder[0]);
    } else {
      board.currentPlayer.bot.clickTravelSpace(newChoiceOrder[0]);
    }
  }
  #noneleft(choiceOrder) {
    // console.log(`@@ DEBUG @@ Got inside #noneleft`);
    let newChoiceOrder = choiceOrder.sort((a, b) => {
      if (
        (a.fromHomeRow && b.fromHomeRow) ||
        (!a.fromHomeRow && !b.fromHomeRow)
      ) {
        return 0;
      }
      if (a.fromHomeRow) {
        return -1;
      }
      if (b.fromHomeRow) {
        return 1;
      }
    });
    if (newChoiceOrder[0].fromHomeRow) {
      board.currentPlayer.bot.clickHomeSpace(newChoiceOrder[0]);
    } else {
      board.currentPlayer.bot.clickTravelSpace(newChoiceOrder[0]);
    }
  }
  // can call these methods with setTimeout
  //
  // need method to take turn-choice array
  // decide where to click
  // if zero length array, click on next turn button
  // else if single option, click that option, then next turn
  // else decide which option based on bot style

  clickTravelSpace(choice) {
    board.travelSpaces.forEach((space) => {
      if (space.spaceNumber == choice.spaceNumber) {
        space.$circle.click();
      }
    });
  }
  clickHomeSpace(choice) {
    board.homeSpaces.forEach((space) => {
      if (
        space.getAttribute("owner") == choice.color &&
        space.spaceNumber == choice.spaceNumber
      ) {
        space.$circle.click();
      }
    });
  }
  clickNextTurn() {
    board.turnOptions.$nextTurnButton.click();
  }
  clickDiceRoller() {
    board.diceRoller.$button.click();
  }
}

// roll > choose > maybe roll again > maybe choose again > next player
