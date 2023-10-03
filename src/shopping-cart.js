import { LitElement, html, css } from 'lit-element';

import './cart-item.js';

import './order-summary.js';

export class ShoppingCart extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        justify-content: space-evenly;
        padding: 2rem;
        margin-bottom: 2.5rem;
        color: #69ddffff;
        font-family: 'Martian Mono', monospace;
      }
      .console-effect {
        display: inline-block;
        overflow: hidden;
        border-right: 0.15em solid #69ddff;
        white-space: nowrap;
        width: 0;
        animation: typingEffect 5s steps(40, end) forwards,
          blinkCursor 0.75s step-end infinite 5s;
      }

      @keyframes typingEffect {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }

      @keyframes blinkCursor {
        from,
        to {
          border-color: transparent;
        }
        50% {
          border-color: #69ddff;
        }
      }

      @media (max-width: 768px) {
        :host {
          flex-direction: column;
          align-items: center;
        }
      }
    `,
  ];

  static get properties() {
    return {
      cart: { type: Array },
    };
  }

  constructor() {
    super();
    this.cart = [];
  }

  /*   removeFromCart(productToRemove) {
    this.dispatchEvent(
      new CustomEvent('remove-from-cart', {
        detail: productToRemove,
        bubbles: true,
        composed: true,
      })
    );
  } */

  render() {
    const subtotal = this.cart.reduce(
      (acc, product) => acc + product.shoe.price,
      0
    );
    const shippingCost = 4;
    const total = subtotal + shippingCost;
    return html`
      <div class="cart-items">
        <h2>Your Cart:</h2>
        ${this.cart.length === 0
          ? html`<p class="console-effect">
              Your cart is empty. Start shopping to add items to your cart!
            </p>`
          : this.cart.map(
              product => html`<cart-item .product="${product}"></cart-item>`
            )}
      </div>
      <order-summary
        .subtotal="${subtotal}"
        .shippingCost="${shippingCost}"
        .total="${total}"
      ></order-summary>
    `;
  }
}
customElements.define('shopping-cart', ShoppingCart);
