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
          gap: 1.6rem;
          padding: 1.5rem 1.6rem;
          box-sizing: border-box;
          height: 100%;
          color: #fff;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background:
            radial-gradient(120% 120% at 0% 0%, rgba(255,255,255,0.18) 0%, transparent 45%),
            linear-gradient(160deg, #2563eb 0%, #1e3a8a 100%);
          position: relative;
          overflow: hidden;
        }
        :host::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(60% 80% at 100% 0%, rgba(255,255,255,0.12), transparent 60%);
          pointer-events: none;
        }
        .top { display: flex; align-items: center; gap: 1rem; z-index: 1; }
        .avatar {
          width: 58px;
          height: 58px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          font-size: 1.4rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 6px 16px rgba(0,0,0,0.25);
          flex-shrink: 0;
        }
        .info { display: flex; flex-direction: column; gap: 0.3rem; min-width: 0; }
        .name {
          font-weight: 700; font-size: 1.2rem; letter-spacing: -0.015em;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .role {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: rgba(255, 255, 255, 0.8);
        }
        .role::before {
          content: "";
          width: 7px; height: 7px; border-radius: 50%;
          background: #86efac;
          box-shadow: 0 0 8px #86efac;
        }
        button {
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          width: 100%;
          padding: 0.85rem 1rem;
          border: none;
          border-radius: 12px;
          background: #fff;
          color: #1e3a8a;
          font-family: inherit;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: transform 0.12s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        button svg { width: 17px; height: 17px; }
        button:hover { background: #eef2ff; box-shadow: 0 10px 24px rgba(0,0,0,0.28); }
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