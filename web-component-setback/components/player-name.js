const template = document.createElement("template");

// Defining HTML-like syntax using backticks
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    .player {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-block-color: var(--player-color,black);
      border-color: var(--player-color,black);
    }
    .player>legend{
      color: var(--player-color,black);
      text-shadow: 0px 0px 0.9rem white;
      font-size: 1.5rem;
    }
    #player-input {
      font-size: 1.5rem;
    }
  </style>
  <fieldset class="player">
    <legend>Placeholder</legend>
    <input id="player-input" class="name" size="12" type="text" />
  </fieldset>
`;

class PlayerName extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Internal state
    this._active = false;
    this._colorName = "";
    this._playerName = "";
    this.isValidInput = false;

    // Elements
    this.$textInput = this.shadowRoot.querySelector(".name");
    this.$legend = this.shadowRoot.querySelector("legend");
  }
  toggleDisabled() {
    this.$textInput.disabled = !this.$textInput.disabled;
  }
  static get observedAttributes() {
    return ["color"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "color") {
      this.style.setProperty("--player-color", newValue);
      this._colorName = `${newValue.charAt(0).toUpperCase()}${newValue.slice(1)}`;
      this.$legend.textContent = this._colorName;
      console.log(
        `The color name for player-name element is ${this._colorName}`,
      );
    }
  }
}

customElements.define("player-name", PlayerName);
