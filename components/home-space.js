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
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .circle {
      width: 80%;
      height: 80%;
      border-radius: 50%;
      border: 2px black solid;
      background-color: var(--background-color,white);
      box-shadow: 0px 0px 0.5rem 0.1rem var(--shadow-color);
      font-size: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .enable-click {
      cursor: pointer;

      transform: scale(1);
      animation: pulse 1.5s infinite;
    }
    .disable-click {
      pointer-events: none;
      cursor: default;
    }
    @keyframes pulse {
      0%{
        transform: scale(0.95);
      }
      70%{
        transform: scale(1.2);
      }
      100%{
        transform: scale(0.95);
      }
    }
  </style>
  <div class="container">
    <div class="circle"></div>
  </div>
`;

class HomeSpace extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Internal state
    this._active = false;
    this._spaceNumber = 0;
    this.occupied = "white";
    this._isClickable = false;

    // Elements
    this.$container = this.shadowRoot.querySelector(".container");
    this.$circle = this.shadowRoot.querySelector(".circle");
    this.$circle.classList.add("disable-click");
  }
  connectedCallback() {
    this.$circle.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("select-piece", {
          detail: { pieceLocation: "home", spaceNumber: this._spaceNumber },
          bubbles: true,
          composed: true,
        }),
      );
    });
  }

  get spaceNumber() {
    return this._spaceNumber;
  }
  get isClickable() {
    return this._isClickable;
  }
  enableClick() {
    if (!this._isClickable) {
      this.$circle.classList.add("enable-click");
      this.$circle.classList.remove("disable-click");
      this._isClickable = true;
    }
  }
  disableClick() {
    if (this._isClickable) {
      this.$circle.classList.remove("enable-click");
      this.$circle.classList.add("disable-click");
      this._isClickable = false;
    }
  }

  static get observedAttributes() {
    return ["area", "occupied", "owner"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "area") {
      this.style.setProperty("--grid-area", newValue);
      this._spaceNumber = Number(
        newValue.substring(newValue.length - 2, newValue.length),
      );
      this.$circle.textContent = this._spaceNumber;
    }
    if (name === "occupied") {
      this.style.setProperty("--background-color", newValue);
      this.occupied = newValue;
    }
    if (name === "owner") this.style.setProperty("--shadow-color", newValue);
  }
}

customElements.define("home-space", HomeSpace);
