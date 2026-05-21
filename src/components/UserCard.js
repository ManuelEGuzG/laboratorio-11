// UserCard.js — <user-card> : tarjeta de usuario
// Avatar + nombre + rol + botón "Saludar" que dispara un CustomEvent.

const DEFAULT_AVATAR = "U";
const DEFAULT_NAME = "Usuario";
const DEFAULT_ROLE = "Invitado";

class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.avatar = this.getAttribute("avatar") ?? DEFAULT_AVATAR;
    this.name = this.getAttribute("name") ?? DEFAULT_NAME;
    this.role = this.getAttribute("role") ?? DEFAULT_ROLE;
    this.render();
  }

  #handleGreet() {
    const event = new CustomEvent("usercard:greet", {
      bubbles: true,
      composed: true,
      detail: { name: this.name }
    });
    this.dispatchEvent(event);
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.4rem;
          padding: 1.4rem 1.5rem;
          box-sizing: border-box;
          height: 100%;
          border-radius: 16px;
          border: 1px solid rgba(96, 165, 250, 0.4);
          background: linear-gradient(180deg, rgba(96,165,250,0.14), rgba(96,165,250,0.06));
          color: #bfdbfe;
        }
        .top { display: flex; align-items: center; gap: 0.9rem; }
        .avatar {
          display: grid; place-items: center;
          width: 46px; height: 46px;
          flex-shrink: 0;
          border-radius: 12px;
          font-size: 1.2rem; font-weight: 700;
          background: rgba(96, 165, 250, 0.18);
          color: #93c5fd;
        }
        .info { display: flex; flex-direction: column; gap: 0.25rem; min-width: 0; }
        .name {
          font-weight: 700; font-size: 1.1rem; color: #eff6ff;
          letter-spacing: -0.01em;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .role {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.07em;
          color: #93c5fd;
        }
        .role::before {
          content: "";
          width: 6px; height: 6px; border-radius: 50%;
          background: #86efac;
          box-shadow: 0 0 8px #86efac;
        }
        button {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 0.55rem;
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(96, 165, 250, 0.45);
          border-radius: 11px;
          background: rgba(96, 165, 250, 0.16);
          color: #dbeafe;
          font-family: inherit;
          font-weight: 600;
          font-size: 0.92rem;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.12s ease;
        }
        button svg { width: 17px; height: 17px; }
        button:hover { background: rgba(96, 165, 250, 0.26); }
        button:active { transform: translateY(1px) scale(0.99); }
      </style>

      <div class="top">
        <div class="avatar" part="avatar">${this.avatar}</div>
        <div class="info">
          <span class="name" part="name">${this.name}</span>
          <span class="role" part="role">${this.role}</span>
        </div>
      </div>
      <button part="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
        Saludar
      </button>
    `);

    this.shadowRoot
      .querySelector("button")
      .addEventListener("click", () => this.#handleGreet());
  }
}

customElements.define("user-card", UserCard);