// WeatherTime.js — <weather-time> : clima por cantón de Guanacaste
// Selector que cambia el cantón, vuelve a consultar la API y re-renderiza.

const CANTONES = [
  { value: "liberia+guanacaste",    label: "Liberia" },
  { value: "nicoya+guanacaste",     label: "Nicoya" },
  { value: "santa+cruz+guanacaste", label: "Santa Cruz" },
  { value: "bagaces+guanacaste",    label: "Bagaces" },
  { value: "carrillo+guanacaste",   label: "Carrillo" },
  { value: "canas+guanacaste",      label: "Cañas" },
  { value: "abangares+guanacaste",  label: "Abangares" },
  { value: "tilaran+guanacaste",    label: "Tilarán" },
  { value: "nandayure+guanacaste",  label: "Nandayure" },
  { value: "la+cruz+guanacaste",    label: "La Cruz" },
  { value: "hojancha+guanacaste",   label: "Hojancha" },
];

class WeatherTime extends HTMLElement {
  data = {};
  loading = true;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.location = this.getAttribute("location") ?? CANTONES[0].value;
    this.render();
    this.#fetchWeather();
  }

  get cantonLabel() {
    return CANTONES.find((c) => c.value === this.location)?.label ?? "Liberia";
  }
  get temperature() { return this.data?.temperature; }
  get description() { return this.data?.description ?? "Sunny"; }
  get wind() { return this.data?.wind ?? "—"; }

  async #fetchWeather() {
    this.loading = true;
    this.render();
    try {
      const url = `https://goweather.xyz/v2/weather/${this.location}`;
      const response = await fetch(url);
      this.data = await response.json();
    } catch {
      this.data = { temperature: "31 °C", description: "Sunny", wind: "10 km/h" };
    }
    this.loading = false;
    this.render();
  }

  #onCantonChange(event) {
    this.location = event.target.value;
    this.setAttribute("location", this.location);
    this.#fetchWeather();
  }

  render() {
    if (!this.shadowRoot) return;

    const options = CANTONES.map(
      (c) => `<option value="${c.value}" ${c.value === this.location ? "selected" : ""}>${c.label}</option>`
    ).join("");

    const body = this.loading
      ? /* html */`<div class="loading"><span></span><span></span><span></span></div>`
      : /* html */`
        <div class="data">
          <div class="temp-row">
            <span class="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"></path>
              </svg>
            </span>
            <span class="temp">${this.temperature}</span>
          </div>
          <div class="meta">
            <span class="desc">${this.description}</span>
            <span class="wind">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
              </svg>
              Viento ${this.wind}
            </span>
          </div>
        </div>
      `;

    this.shadowRoot.setHTMLUnsafe(/* html */`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          padding: 1.4rem 1.5rem;
          box-sizing: border-box;
          height: 100%;
          border-radius: 16px;
          border: 1px solid rgba(45, 212, 191, 0.4);
          background: linear-gradient(180deg, rgba(45,212,191,0.14), rgba(45,212,191,0.06));
          color: #99f6e4;
        }
        .head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
        }
        .label {
          display: inline-flex; align-items: center; gap: 0.45rem;
          font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.07em;
          color: #5eead4;
          line-height: 1.35;
          max-width: 55%;
        }
        .label svg { width: 14px; height: 14px; flex-shrink: 0; }
        select {
          font-family: inherit;
          font-size: 0.82rem; font-weight: 600;
          color: #042f2e;
          background: #99f6e4;
          border: 1px solid rgba(45, 212, 191, 0.5);
          border-radius: 10px;
          padding: 0.4rem 0.6rem;
          cursor: pointer;
          min-width: 120px;
          transition: box-shadow 0.2s ease, transform 0.12s ease;
        }
        select:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.25); }
        select:active { transform: translateY(1px); }

        .data { display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto; }
        .temp-row { display: flex; align-items: center; gap: 0.7rem; }
        .icon {
          display: grid; place-items: center;
          width: 44px; height: 44px;
          flex-shrink: 0;
          border-radius: 12px;
          background: rgba(45, 212, 191, 0.18);
          color: #5eead4;
        }
        .icon svg { width: 24px; height: 24px; }
        .temp { font-size: 2.6rem; font-weight: 800; color: #f0fdfa; letter-spacing: -0.02em; line-height: 1; }
        .meta { display: flex; flex-direction: column; gap: 0.3rem; }
        .desc { font-weight: 700; font-size: 1.05rem; color: #ccfbf1; line-height: 1.3; }
        .wind {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.82rem; color: #5eead4;
        }
        .wind svg { width: 14px; height: 14px; }

        .loading { display: flex; gap: 8px; padding: 1rem 0; }
        .loading span {
          width: 13px; height: 13px; border-radius: 50%;
          background: #5eead4;
          animation: bounce 0.9s infinite alternate;
        }
        .loading span:nth-child(2) { animation-delay: 0.15s; }
        .loading span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes bounce {
          from { transform: translateY(-8px); opacity: 0.45; }
          to   { transform: translateY(0); opacity: 1; }
        }
      </style>

      <div class="head">
        <span class="label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          ${this.cantonLabel} · Guanacaste
        </span>
        <select part="select">${options}</select>
      </div>
      ${body}
    `);

    const select = this.shadowRoot.querySelector("select");
    if (select) select.addEventListener("change", (e) => this.#onCantonChange(e));
  }
}

customElements.define("weather-time", WeatherTime);