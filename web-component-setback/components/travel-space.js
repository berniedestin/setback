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
      font-size: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .double-space {
      box-shadow: 0px 0px 0.5rem 0.1rem magenta;
    }
    .enable-click {
      cursor: pointer;
    }
    .disable-click {
      pointer-events: none;
      cursor: default;
    }
  </style>
  <div class="container">
    <div class="circle"></div>
  </div>
`;

class TravelSpace extends HTMLElement {
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
  get spaceNumber() {
    return this._spaceNumber;
  }

  get isOccupied() {
    return this.occupied != "white";
  }
  setOccupied(color) {
    this.style.setProperty("--background-color", color);
    this.occupied = color;
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
  get isDoubleSpace() {
    return (
      this._spaceNumber == 4 ||
      this._spaceNumber == 11 ||
      this._spaceNumber == 18 ||
      this._spaceNumber == 25
    );
  }
  get currentColor() {
    this.occupied;
  }

  static get observedAttributes() {
    return ["area", "occupied"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "area") {
      this.style.setProperty("--grid-area", newValue);
      this._spaceNumber = Number(
        newValue.substring(newValue.length - 2, newValue.length),
      );
      this.$circle.textContent = this._spaceNumber;
      if (this.isDoubleSpace) this.$circle.classList.add("double-space");
    }
    if (name === "occupied") {
      this.style.setProperty("--background-color", newValue);
      this.occupied = newValue;
    }
  }
}

customElements.define("travel-space", TravelSpace);
