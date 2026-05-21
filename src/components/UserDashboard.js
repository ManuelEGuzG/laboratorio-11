// UserDashboard.js — <user-dashboard> : contenedor grande + orquestador
// Es el cuadro grande que contiene los 3 recuadros. Captura el evento
// "usercard:greet" del <user-card> y lo reenvía al <warning-badge>.

class UserDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    // Escuchamos el evento que burbujea desde <user-card>.
    // Como bubbles + composed = true, atraviesa los Shadow DOM y llega aquí.
    this.addEventListener("usercard:greet", (e) => this.#onGreet(e));
  }

  // Maneja el saludo: actualiza el <warning-badge> mediante atributos reactivos
  #onGreet(event) {
    const name = event.detail?.name ?? "Usuario";
    const badge = this.querySelector("warning-badge");
    if (!badge) return;

    badge.setAttribute("greeting", `¡Hola, ${name}! 👋`); // atributo reactivo
    badge.setAttribute("pulsing", "");                     // atributo reactivo
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <style>
        /* El contenedor grande (el "cuadro" de la imagen) */
        :host {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-areas:
            "card weather"
            "badge badge";
          gap: 1.5rem;
          padding: 2rem;
          background: #d9cfe0;
          border: 2px solid #b9aac4;
          border-radius: 24px;
          width: 560px;
          max-width: 90vw;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
        }

        /* Cada hijo ocupa su zona de la rejilla */
        ::slotted(user-card)     { grid-area: card; }
        ::slotted(weather-time)  { grid-area: weather; }
        ::slotted(warning-badge) { grid-area: badge; }
      </style>

      <!-- Los componentes hijos se proyectan aquí (Light DOM → Shadow DOM) -->
      <slot></slot>
    `);
  }
}

customElements.define("user-dashboard", UserDashboard);