// WarningBadge.js — <warning-badge> : recuadro AMARILLO
// Muestra el texto de sesión + el saludo. Atributos REACTIVOS: "pulsing" y "greeting".

class WarningBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Reactividad: atributos que vigilamos
  static get observedAttributes() {
    return ["pulsing", "greeting"];
  }

  connectedCallback() {
    this.baseText = this.textContent.trim() || "Sesión por expirar";
    this.render();
  }

  // Se dispara solo cuando cambia un atributo observado
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Atributo "${name}": ${oldValue} → ${newValue}`);
    if (this.shadowRoot && this.baseText !== undefined) {
      this.render();
    }
  }

  get greeting() { return this.getAttribute("greeting"); }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <style>
        :host {
          display: block;
          background: #f0ec9e;
          border: 2px solid #d8d36a;
          border-radius: 16px;
          padding: 1.25rem;
          color: #6b6420;
          font-weight: 600;
          text-align: center;
        }
        /* Estilo REACTIVO: solo cuando el atributo pulsing está presente */
        :host([pulsing]) {
          animation: pulse 1s infinite;
          border-color: #e0a800;
        }
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(224,168,0,0.6); }
          70%  { box-shadow: 0 0 0 14px rgba(224,168,0,0); }
          100% { box-shadow: 0 0 0 0 rgba(224,168,0,0); }
        }
        .session { font-size: 1rem; }
        .greeting {
          margin-top: 0.5rem;
          font-size: 1.15rem;
          color: #1a3a5c;
          font-weight: 800;
        }
      </style>

      <div class="session">⚠️ ${this.baseText}</div>
      ${this.greeting ? `<div class="greeting">${this.greeting}</div>` : ""}
    `);
  }
}

customElements.define("warning-badge", WarningBadge);