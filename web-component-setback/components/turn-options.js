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
    #player-message {
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

    // Elements
    this.$turnOptionsContainer = this.shadowRoot.querySelector("#turn-options");
    this.$playerName = this.shadowRoot.querySelector("#player-name");
    this.$playerMessage = this.shadowRoot.querySelector("#player-message");
    this.$beginButton = this.shadowRoot.querySelector("#begin");
  }
  connectedCallback() {
    // Add event listener for click/press
    this.$beginButton.addEventListener("click", () => {
      this._gameStart = true;

      this.$beginButton.style.display = "none";

      this.$playerName.style.display = "block";
      this.nextPlayer("red");

      this.dispatchEvent(
        new CustomEvent("game-start", {
          detail: { gameStart: this._gameStart },
          bubbles: true,
          composed: true,
        }),
      );
    });
  }
  nextPlayer(color) {
    this.$playerMessage.style.display = "none";
    let colorName = `${color.charAt(0).toUpperCase()}${color.slice(1)}`;
    this.$playerName.textContent = `${colorName}! Your turn!`;
    this.$playerName.style.color = `${color}`;
  }
  playerMessage(message) {
    this.$playerMessage.style.display = "block";
    this.$playerMessage.textContent = message;
  }

  turn(player, rollNum) {
    //unfinished, don't know if it should be here or in the main file
    if (player.isHuman) {
    }
  }
}

customElements.define("turn-options", TurnOptions);
