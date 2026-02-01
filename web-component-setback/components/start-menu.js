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
    <div id="red" class="player">Red</div>
    <div id="green" class="player">Green</div>
    <div id="yellow" class="player">Yellow</div>
    <div id="blue" class="player">Blue</div>
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
    this.$readyButton = this.shadowRoot.querySelector("#ready");
  }
  activateReadyButton() {
    this.$readyButton.style.display = "block";
  }
  deactivateReadyButton() {
    this.$readyButton.style.display = "none";
  }
}

customElements.define("start-menu", StartMenu);
