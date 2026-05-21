// WeatherTime.js — <weather-time> : recuadro VERDE
// Info del clima (API goweather del ejemplo de las slides) con estado de carga.

class WeatherTime extends HTMLElement {
  data = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.init();
  }

  connectedCallback() {
    this.render();
  }

  async init() {
    try {
      const location = this.getAttribute("location") ?? "liberia+guanacaste";
      const url = `https://goweather.xyz/v2/weather/${location}`;
      const response = await fetch(url);
      this.data = await response.json();
    } catch {
      // Respaldo con los datos del enunciado si la API no responde
      this.data = { temperature: "31 °C", description: "Sunny" };
    }
    this.render();
  }

  get temperature() { return this.data?.temperature; }
  get description() { return this.data?.description ?? "Sunny"; }

  render() {
    if (!this.shadowRoot) return;

    const loading = /* html */`<div class="loading"></div>`.repeat(3);
    const loaded = /* html */`
      <div class="weather">
        <span class="city">Liberia</span>
        <span class="temp">${this.temperature}</span>
        <span class="desc">☀️ ${this.description}</span>
      </div>
    `;

    this.shadowRoot.setHTMLUnsafe(/* html */`
      <style>
        :host {
          display: block;
          background: #c5e8c5;
          border: 2px solid #9ed09e;
          border-radius: 16px;
          padding: 1.25rem;
          min-height: 100px;
          box-sizing: border-box;
        }
        .weather { display: flex; flex-direction: column; gap: 0.25rem; color: #1a4d1a; }
        .city { font-weight: 700; font-size: 1.05rem; }
        .temp { font-size: 1.6rem; font-weight: 800; }
        .desc { font-size: 0.9rem; color: #2d6a2d; }

        .loading {
          --size: 16px;
          width: var(--size); height: var(--size);
          background: #2d6a2d; border-radius: 50%;
          display: inline-block; margin: 4px;
          animation: bounce 1s infinite alternate;
        }
        @keyframes bounce {
          0% { translate: 0 -10px; }
          100% { translate: 0 0; }
        }
      </style>
      ${!this.temperature ? loading : loaded}
    `);
  }
}

customElements.define("weather-time", WeatherTime);