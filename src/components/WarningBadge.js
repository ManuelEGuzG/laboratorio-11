// WarningBadge.js — <warning-badge> : aviso de sesión + saludo
// Atributos REACTIVOS: "pulsing" y "greeting".

class WarningBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["pulsing", "greeting"];
  }

  connectedCallback() {
    this.baseText = this.textContent.trim() || "Sesión por expirar";
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot && this.baseText !== undefined) this.render();
  }

  get greeting() { return this.getAttribute("greeting"); }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <style>
        :host {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          padding: 1.1rem 1.3rem;
          box-sizing: border-box;
          border-radius: 16px;
          color: #fde68a;
          border: 1px solid rgba(234, 179, 8, 0.4);
          background: linear-gradient(180deg, rgba(234,179,8,0.14), rgba(234,179,8,0.06));
          transition: border-color 0.3s ease;
        }
        :host([pulsing]) {
          animation: pulse 1.6s infinite;
          border-color: #eab308;
        }
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.4); }
          70%  { box-shadow: 0 0 0 14px rgba(234, 179, 8, 0); }
          100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); }
        }
        .icon {
          display: grid; place-items: center;
          width: 38px; height: 38px;
          flex-shrink: 0;
          border-radius: 11px;
          background: rgba(234, 179, 8, 0.18);
          color: #fbbf24;
        }
        .icon svg { width: 20px; height: 20px; }
        :host([pulsing]) .icon { box-shadow: 0 0 14px 2px rgba(234, 179, 8, 0.5); }
        .content { display: flex; flex-direction: column; gap: 0.15rem; }
        .session { font-size: 0.94rem; font-weight: 600; color: #fef3c7; }
        .greeting {
          font-size: 0.85rem;
          font-weight: 500;
          color: #fde68a;
          opacity: 0;
          animation: fadeIn 0.4s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      </style>

      <span class="icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </span>
      <div class="content">
        <span class="session" part="session">${this.baseText}</span>
        ${this.greeting ? `<span class="greeting" part="greeting">${this.greeting}</span>` : ""}
      </div>
    `);
  }
}

customElements.define("warning-badge", WarningBadge);