import { LitElement, html, css } from 'lit-element';

import './cart-item.js';

import './order-summary.js';

export class ShoppingCart extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        justify-content: space-around;
        padding: 2rem;
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

  removeFromCart(productToRemove) {
    this.dispatchEvent(
      new CustomEvent('remove-from-cart', {
        detail: productToRemove,
        bubbles: true,
        composed: true,
      })
    );
  }

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
          ? html`<p>
              Your cart is empty. Start shopping to add items to your cart!
            </p>`
          : this.cart.map(
              product =>
                html`<cart-item
                  .product="${product}"
                  @remove-from-cart="${this.removeFromCart}"
                ></cart-item>`
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
