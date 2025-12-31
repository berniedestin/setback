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
    }
  </style>
  <div class="container">
    <div class="circle"></div>
  </div>
`;

class VictorySpace extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Internal state
    this._active = false;

    // Elements
    this.$container = this.shadowRoot.querySelector(".container");
    this.$circle = this.shadowRoot.querySelector(".circle");
  }

  static get observedAttributes() {
    return ["area", "occupied", "owner"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "area") this.style.setProperty("--grid-area", newValue);
    if (name === "occupied")
      this.style.setProperty("--background-color", newValue);
    if (name === "owner") this.style.setProperty("--shadow-color", newValue);
  }
}

customElements.define("victory-space", VictorySpace);
