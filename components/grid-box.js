class GridBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        /* Default to span 1 if no area is provided */
        grid-column: span var(--span-x, 1);
        grid-row: span var(--span-y, 1);
        /* Use the named area if provided */
        grid-area: var(--grid-area, auto);
      }
      div {
        background-color: var(--box-color, #ccc);
        /*border-radius:50%;*/
        width: 100%;
        height: 100%;
      }
    `;

    const container = document.createElement("div");
    this.shadowRoot.append(style, container);
  }

  static get observedAttributes() {
    return ["x", "y", "color", "area"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "x") this.style.setProperty("--span-x", newValue);
    if (name === "y") this.style.setProperty("--span-y", newValue);
    if (name === "color") this.style.setProperty("--box-color", newValue);
    if (name === "area") this.style.setProperty("--grid-area", newValue);
  }
}

customElements.define("grid-box", GridBox);
