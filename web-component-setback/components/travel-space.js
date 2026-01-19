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
    this._isOccupied = false;
    this.occupied = "white";

    // Elements
    this.$container = this.shadowRoot.querySelector(".container");
    this.$circle = this.shadowRoot.querySelector(".circle");
  }
  get spaceNumber() {
    return this._spaceNumber;
  }

  get isOccupied() {
    return this.occupied != "white";
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
  changeColor(color) {
    this.style.setProperty("--background-color", color);
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
    }
    if (name === "occupied") {
      this.style.setProperty("--background-color", newValue);
      this.occupied = newValue;
    }
  }
}

customElements.define("travel-space", TravelSpace);
