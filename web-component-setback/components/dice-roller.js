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

    // Elements
    this.$container = this.shadowRoot.querySelector(".container");
    this.$button = this.shadowRoot.querySelector("#action-btn");
  }
  connectedCallback() {
    // Add event listener for click/press
    this.$button.addEventListener("click", () => this.toggleState());
  }

  toggleState() {
    this._active = !this._active;
    let roll = Math.floor(Math.random() * 6) + 1;

    if (this._active) {
      this.$container.classList.add("rotated");
      this.$button.textContent = `${roll}`;
    } else {
      this.$container.classList.remove("rotated");
      this.$button.textContent = `${roll}`;
    }
  }
  static get observedAttributes() {
    return ["area"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "area") this.style.setProperty("--grid-area", newValue);
  }
}

customElements.define("dice-roller", DiceRoller);
