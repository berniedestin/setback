const template = document.createElement("template");

// Defining HTML-like syntax using backticks
template.innerHTML = `
  <style>
    :host {
      display: block;
      grid-area: var(--grid-area, auto);
    }
    .container {
      width: 100%;
      height: 100%;
      background-color: #D3D3D3;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.5s ease; /* Smooth rotation */
    }
    .container.rotated {
      transform: rotate(360deg);
    }
    button {
      width: 40%;
      height: 40%;
      font-size:2rem;
      background-color: white;
      cursor: pointer;
      font-weight: bold;
    }
    .disable-click {
      pointer-events: none;
      cursor: default;
    }
  </style>
  <div class="container">
    <button id="action-btn">6</button>
  </div>
`;

class DiceRoller extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Internal state
    this._active = false;
    this._currentRoll = 6;
    this._isClickable = false;

    // Elements
    this.$container = this.shadowRoot.querySelector(".container");
    this.$button = this.shadowRoot.querySelector("#action-btn");
    this.$button.classList.add("disable-click");
  }
  get diceRoll() {
    return this._currentRoll;
  }
  enableClick() {
    if (!this._isClickable) {
      this.$button.classList.remove("disable-click");
      this._isClickable = true;
    }
  }
  disableClick() {
    if (this._isClickable) {
      this.$button.classList.add("disable-click");
      this._isClickable = false;
    }
  }
  connectedCallback() {
    // Add event listener for click/press
    this.$button.addEventListener("click", () => this.roll());
  }
  roll() {
    this._currentRoll = Math.floor(Math.random() * 6) + 1;

    this._active = !this._active;

    if (this._active) {
      this.$container.classList.add("rotated");
      this.$button.textContent = `${this._currentRoll}`;
    } else {
      this.$container.classList.remove("rotated");
      this.$button.textContent = `${this._currentRoll}`;
    }

    this.dispatchEvent(
      new CustomEvent("dice-rolled", {
        detail: { value: this._currentNumber },
        bubbles: true,
        composed: true,
      }),
    );
    this.disableClick();
  }

  static get observedAttributes() {
    return ["area"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "area") this.style.setProperty("--grid-area", newValue);
  }
}

customElements.define("dice-roller", DiceRoller);
