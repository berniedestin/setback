import { board } from "../models/board.js";

const template = document.createElement("template");

// Defining HTML-like syntax using backticks
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    #turn-options {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    #player-name {
      display: none;
      font-size:2rem;
      text-shadow: 0px 0px 0.9rem white;
    }
    #player-message,
    #next-turn,
   #reset {
      display: none;
      font-size:2rem;
    }
    .button {
      background-color: white;
      border: 2px black solid;
      border-radius: 1rem;
      font-size: 3rem;
      font-weight: bold;
      padding: 1rem 2rem;
      margin: 1rem;
      cursor: pointer;
    }
    #options {
      display:none;
    }
    .option {
      border: 2px black solid;
      background: white;
      font-size: 2rem;
    }
  </style>
  <div id="turn-options">
    <div id="player-name"></div>
    <div id="player-message"></div>
    <div id="begin" class="button">Begin!</div>
    <div id="next-turn" class="button">Next Turn!</div>
    <div id="reset" class="button">Start Menu</div>
    <div id="options"></div>
  </div>
`;

class TurnOptions extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Internal state
    this._active = false;
    this._gameStart = false;
    //this.currentPlayer = "";

    // Elements
    this.$turnOptionsContainer = this.shadowRoot.querySelector("#turn-options");
    this.$playerName = this.shadowRoot.querySelector("#player-name");
    this.$playerMessage = this.shadowRoot.querySelector("#player-message");
    this.$beginButton = this.shadowRoot.querySelector("#begin");
    this.$nextTurnButton = this.shadowRoot.querySelector("#next-turn");
    this.$resetButton = this.shadowRoot.querySelector("#reset");
  }
  connectedCallback() {
    // Add event listener for click/press
    this.$beginButton.addEventListener("click", () => {
      this._gameStart = true;
      board.currentPlayer = board.players.find(
        (player) => player.color == "red",
      );

      this.$beginButton.style.display = "none";

      this.$playerName.style.display = "block";
      this.nextPlayer(board.currentPlayer);

      this.dispatchEvent(
        new CustomEvent("game-start", {
          detail: { gameStart: this._gameStart },
          bubbles: true,
          composed: true,
        }),
      );
    });
    this.$nextTurnButton.addEventListener("click", () => {
      this.$nextTurnButton.style.display = "none";

      this.dispatchEvent(
        new CustomEvent("next-turn", {
          detail: { previousPlayer: board.currentPlayer },
          bubbles: true,
          composed: true,
        }),
      );
    });
    this.$resetButton.addEventListener("click", () => {
      this.$resetButton.style.display = "none";

      this.dispatchEvent(
        new CustomEvent("game-reset", {
          detail: { resetGame: true },
          bubbles: true,
          composed: true,
        }),
      );
    });
  }
  activateNextTurnButton() {
    this.$nextTurnButton.style.display = "block";
  }
  deactivateNextTurnButton() {
    this.$nextTurnButton.style.display = "none";
  }
  activateResetButton() {
    this.$resetButton.style.display = "block";
  }
  nextPlayer(player) {
    //board.currentPlayer = player.color;
    this.$playerMessage.style.display = "none";
    //let colorName = `${color.charAt(0).toUpperCase()}${color.slice(1)}`;
    this.$playerName.textContent = `${player.name}! Your turn!`;
    this.$playerName.style.color = `${player.color}`;
  }
  addOptions(options) {
    // this method may be unecessary along with the whole #options div
    options.forEach((option) => {
      const newOption = document.createElement("div");
      newOption.textContent = `Move from `;
    });
  }
  playerMessage(message) {
    this.$playerMessage.style.display = "block";
    this.$playerMessage.textContent = message;
  }
  victory(player) {
    this.deactivateNextTurnButton();
    this.activateResetButton();
    this.$playerMessage.style.display = "none";
    //let colorName = `${color.charAt(0).toUpperCase()}${color.slice(1)}`;
    this.$playerName.textContent = `${player.name}! You WON!!`;
    this.$playerName.style.color = `${player.color}`;
  }

  turn(player, rollNum) {
    //unfinished, don't know if it should be here or in the main file
    if (player.isHuman) {
    }
  }
}

customElements.define("turn-options", TurnOptions);
