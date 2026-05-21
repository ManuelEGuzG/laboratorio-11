// UserDashboard.js — <user-dashboard> : contenedor + orquestador
// Captura el evento "usercard:greet" del <user-card> y lo reenvía al <warning-badge>.

class UserDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addEventListener("usercard:greet", (e) => this.#onGreet(e));
  }

  #onGreet(event) {
    const name = event.detail?.name ?? "Usuario";
    const badge = this.querySelector("warning-badge");
    if (!badge) return;

    badge.setAttribute("greeting", `Hola, ${name}. Bienvenido de nuevo.`);
    badge.setAttribute("pulsing", "");
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <style>
        :host {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-areas:
            "header header"
            "card weather"
            "badge badge";
          gap: 1.4rem;
          padding: 2rem;
          width: 720px;
          max-width: 94vw;
          background: linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03));
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 26px;
          backdrop-filter: blur(16px);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.08) inset,
            0 30px 80px rgba(0, 0, 0, 0.5);
        }

        .header {
          grid-area: header;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .title { display: flex; align-items: center; gap: 0.65rem; }
        .title svg { width: 21px; height: 21px; color: #93c5fd; }
        .title h1 {
          margin: 0;
          font-size: 1.12rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          color: #f8fafc;
        }
        .tag {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #93c5fd;
          padding: 0.32rem 0.7rem;
          border: 1px solid rgba(147, 197, 253, 0.35);
          border-radius: 999px;
          background: rgba(147, 197, 253, 0.08);
          white-space: nowrap;
        }

        ::slotted(user-card)     { grid-area: card; }
        ::slotted(weather-time)  { grid-area: weather; }
        ::slotted(warning-badge) { grid-area: badge; }

        @media (max-width: 560px) {
          :host {
            grid-template-columns: 1fr;
            grid-template-areas: "header" "card" "weather" "badge";
            padding: 1.4rem;
          }
        }
      </style>

      <div class="header">
        <div class="title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="9"></rect>
            <rect x="14" y="3" width="7" height="5"></rect>
            <rect x="14" y="12" width="7" height="9"></rect>
            <rect x="3" y="16" width="7" height="5"></rect>
          </svg>
          <h1>Panel de usuario</h1>
        </div>
        <span class="tag">Laboratorio 11</span>
      </div>
      <slot></slot>
    `);
  }
}

customElements.define("user-dashboard", UserDashboard);