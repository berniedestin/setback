import "./player-name.js";
const template = document.createElement("template");

// Defining HTML-like syntax using backticks
template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    #menu-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    #menu-title {
      font-size: 2.5rem;
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
    .player {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  </style>
  <div id="menu-container">
    <div id="menu-title">Enter Player Names!</div>
    <player-name class="player-input" color="red"></player-name>
    <player-name class="player-input" color="green"></player-name>
    <player-name class="player-input" color="yellow"></player-name>
    <player-name class="player-input" color="blue"></player-name>
    <div id="ready" class="button">Ready!</div>
  </div>
`;

class StartMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Internal state
    this._active = false;
    this._gameSetupDone = false;

    // Elements
    this.$menuContainer = this.shadowRoot.querySelector("#menu-container");
    this.$menuTitle = this.shadowRoot.querySelector("#menu-title");
    this.$playerInputs = this.shadowRoot.querySelectorAll("player-name");
    this.$readyButton = this.shadowRoot.querySelector("#ready");
  }
  connectedCallback() {
    this.$readyButton.addEventListener("click", () => {
      let readyToStart = true;
      this.$playerInputs.forEach((input) => {
        // check for valid input in each player-name element
        if (!input.isValidInput) {
          readyToStart = false;
        }
      });
      if (readyToStart) {
        // get players from player name components
        let listOfPlayers = [];
        this.$playerInputs.forEach((player) => {
          listOfPlayers.push(player.getPlayer);
        });
        this.dispatchEvent(
          new CustomEvent("game-prepped", {
            detail: { players: listOfPlayers },
            bubbles: true,
            composed: true,
          }),
        );
      } else {
        this.$menuTitle.textContent = "Enter Names to Begin!";
      }
    });
  }
  // these two are not currently used
  activateReadyButton() {
    this.$readyButton.style.display = "block";
  }
  deactivateReadyButton() {
    this.$readyButton.style.display = "none";
  }
}

customElements.define("start-menu", StartMenu);
