// UserCard.js — <user-card> : recuadro AZUL
// Avatar + nombre + rol + botón [Saludar] que dispara un CustomEvent.

const DEFAULT_AVATAR = "👤";
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

  // Dispara el evento cuando se pulsa "Saludar"
  #handleGreet() {
    const event = new CustomEvent("usercard:greet", {
      bubbles: true,   // burbujea hacia arriba en el DOM
      composed: true,  // atraviesa el Shadow DOM
      detail: { name: this.name }
    });
    this.dispatchEvent(event);
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <style>
        :host {
          display: block;
          background: #bcd4f0;
          border: 2px solid #8fb4e0;
          border-radius: 16px;
          padding: 1.25rem;
        }
        .card { display: flex; align-items: center; gap: 1rem; }
        .avatar {
          font-size: 2.2rem;
          background: white;
          width: 60px; height: 60px;
          border-radius: 50%;
          display: grid; place-items: center;
        }
        .info { display: flex; flex-direction: column; }
        .name { font-weight: 700; font-size: 1.05rem; color: #1a3a5c; }
        .role { font-size: 0.85rem; color: #4a6a8c; }
        button {
          margin-top: 0.9rem;
          padding: 0.5rem 1.1rem;
          border: none;
          border-radius: 8px;
          background: #2563eb;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        button:hover { background: #1d4ed8; }
      </style>

      <div class="card">
        <div class="avatar" part="avatar">${this.avatar}</div>
        <div class="info">
          <span class="name" part="name">${this.name}</span>
          <span class="role" part="role">${this.role}</span>
        </div>
      </div>
      <button part="button">Saludar</button>
    `);

    this.shadowRoot
      .querySelector("button")
      .addEventListener("click", () => this.#handleGreet());
  }
}

customElements.define("user-card", UserCard);