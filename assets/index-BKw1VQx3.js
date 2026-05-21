(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`U`,t=`Usuario`,n=`Invitado`,r=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.avatar=this.getAttribute(`avatar`)??e,this.name=this.getAttribute(`name`)??t,this.role=this.getAttribute(`role`)??n,this.render()}#e(){let e=new CustomEvent(`usercard:greet`,{bubbles:!0,composed:!0,detail:{name:this.name}});this.dispatchEvent(e)}render(){this.shadowRoot.setHTMLUnsafe(`
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
    `),this.shadowRoot.querySelector(`button`).addEventListener(`click`,()=>this.#e())}};customElements.define(`user-card`,r);var i=[{value:`liberia+guanacaste`,label:`Liberia`},{value:`nicoya+guanacaste`,label:`Nicoya`},{value:`santa+cruz+guanacaste`,label:`Santa Cruz`},{value:`bagaces+guanacaste`,label:`Bagaces`},{value:`carrillo+guanacaste`,label:`Carrillo`},{value:`canas+guanacaste`,label:`Cañas`},{value:`abangares+guanacaste`,label:`Abangares`},{value:`tilaran+guanacaste`,label:`Tilarán`},{value:`nandayure+guanacaste`,label:`Nandayure`},{value:`la+cruz+guanacaste`,label:`La Cruz`},{value:`hojancha+guanacaste`,label:`Hojancha`}],a=class extends HTMLElement{data={};loading=!0;constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.location=this.getAttribute(`location`)??i[0].value,this.render(),this.#e()}get cantonLabel(){return i.find(e=>e.value===this.location)?.label??`Liberia`}get temperature(){return this.data?.temperature}get description(){return this.data?.description??`Sunny`}get wind(){return this.data?.wind??`—`}async#e(){this.loading=!0,this.render();try{let e=`https://goweather.xyz/v2/weather/${this.location}`,t=await fetch(e);this.data=await t.json()}catch{this.data={temperature:`31 °C`,description:`Sunny`,wind:`10 km/h`}}this.loading=!1,this.render()}#t(e){this.location=e.target.value,this.setAttribute(`location`,this.location),this.#e()}render(){if(!this.shadowRoot)return;let e=i.map(e=>`<option value="${e.value}" ${e.value===this.location?`selected`:``}>${e.label}</option>`).join(``),t=this.loading?`<div class="loading"><span></span><span></span><span></span></div>`:`
        <div class="data">
          <div class="temp-row">
            <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"></path>
            </svg>
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
      `;this.shadowRoot.setHTMLUnsafe(`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
          padding: 1.5rem 1.6rem;
          box-sizing: border-box;
          height: 100%;
          color: #ecfdf5;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background:
            radial-gradient(120% 120% at 100% 0%, rgba(255,255,255,0.16) 0%, transparent 45%),
            linear-gradient(160deg, #0d9488 0%, #064e3b 100%);
          position: relative;
          overflow: hidden;
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
          color: rgba(236, 253, 245, 0.82);
          line-height: 1.35;
          max-width: 55%;
        }
        .label svg { width: 14px; height: 14px; flex-shrink: 0; }
        select {
          font-family: inherit;
          font-size: 0.82rem;
          font-weight: 600;
          color: #064e3b;
          background: #ecfdf5;
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 10px;
          padding: 0.4rem 0.6rem;
          cursor: pointer;
          min-width: 120px;
          transition: box-shadow 0.2s ease, transform 0.12s ease;
        }
        select:hover { box-shadow: 0 6px 16px rgba(0,0,0,0.28); }
        select:active { transform: translateY(1px); }

        .data { display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto; }
        .temp-row { display: flex; align-items: center; gap: 0.7rem; }
        .sun { width: 38px; height: 38px; color: #fde68a; flex-shrink: 0; }
        .temp { font-size: 2.8rem; font-weight: 800; letter-spacing: -0.02em; line-height: 1; }
        .meta { display: flex; flex-direction: column; gap: 0.3rem; }
        .desc { font-weight: 700; font-size: 1.05rem; line-height: 1.3; }
        .wind {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.82rem; color: rgba(236, 253, 245, 0.78);
        }
        .wind svg { width: 14px; height: 14px; }

        .loading { display: flex; gap: 8px; padding: 1.2rem 0; }
        .loading span {
          width: 13px; height: 13px; border-radius: 50%;
          background: rgba(236, 253, 245, 0.9);
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
        <select part="select">${e}</select>
      </div>
      ${t}
    `);let n=this.shadowRoot.querySelector(`select`);n&&n.addEventListener(`change`,e=>this.#t(e))}};customElements.define(`weather-time`,a);var o=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`})}static get observedAttributes(){return[`pulsing`,`greeting`]}connectedCallback(){this.baseText=this.textContent.trim()||`Sesión por expirar`,this.render()}attributeChangedCallback(){this.shadowRoot&&this.baseText!==void 0&&this.render()}get greeting(){return this.getAttribute(`greeting`)}render(){this.shadowRoot.setHTMLUnsafe(`
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
        ${this.greeting?`<span class="greeting" part="greeting">${this.greeting}</span>`:``}
      </div>
    `)}};customElements.define(`warning-badge`,o);var s=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render(),this.addEventListener(`usercard:greet`,e=>this.#e(e))}#e(e){let t=e.detail?.name??`Usuario`,n=this.querySelector(`warning-badge`);n&&(n.setAttribute(`greeting`,`Hola, ${t}. Bienvenido de nuevo.`),n.setAttribute(`pulsing`,``))}render(){this.shadowRoot.setHTMLUnsafe(`
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
    `)}};customElements.define(`user-dashboard`,s),console.log(`Componentes cargados ✅`);