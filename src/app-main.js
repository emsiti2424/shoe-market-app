import { LitElement, html } from "lit-element";
import { outlet } from "lit-element-router";

export class Main extends outlet(LitElement) {
  render() {
    return html`
      <slot></slot>
    `;
  }

  outlet() {
    // Se ha sobreescrito el método outlet de lit-element-router para solucinar el error de la consola poniendo una condicion de verificar si existe el shadowRoot
    try {
        Array.from(this.querySelectorAll(`[route]`)).map((active) => {
            active.style.display = "none";
        });
        if (this.shadowRoot) {
            Array.from(this.shadowRoot.querySelectorAll(`[route]`)).map((active) => {
                active.style.display = "none";
            });
        }
        if (this.activeRoute) {
            Array.from(this.querySelectorAll(`[route~=${this.activeRoute}]`)).map((active) => {
                active.style.display = "";
            });
            if (this.shadowRoot) {
                Array.from(this.shadowRoot.querySelectorAll(`[route~=${this.activeRoute}]`)).map((active) => {
                    active.style.display = "";
                });
            }
        }
    } catch (error) {
        console.error('Error in outlet function:', error);
    }
}

}

customElements.define("app-main", Main);
