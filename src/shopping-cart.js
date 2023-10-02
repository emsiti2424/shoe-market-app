import { LitElement, html, css } from 'lit-element';

export class ShoppingCart extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
      }

      .cart-items,
      .order-summary {
        width: 48%;
      }

      .order-summary {
        border: 1px solid #ccc;
        padding: 16px;
        height: 10%;
        width: 40%;
        margin-right: auto;
        margin-top: 5.7%;
        margin-left: 2%;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s;
        background-color: #69ddffff;
      }
      .order-summary:hover {
        box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
      }
      .order-details {
        border-bottom: 1px solid #ccc;
        margin-bottom: 1rem;
        color: #949494;
      }
      .flex-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
      }
      .card {
        display: flex;
        gap: 6rem;
        padding: 1rem;
        border: 1px solid #ccc;
        margin-bottom: 1rem;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s;
        background-color: #69ddffff;
      }
      .card:hover {
        box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
      }
      .card img {
        width: 10rem;
        object-fit: contain;
      }
      .card-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex: 1;
      }

      .remove-btn {
        background-color: red;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        width: 30%;
        border-radius: 2rem;
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
      .shoe-price {
        color: #9f158f;
      }
      @media (max-width: 768px) {
    :host {
        flex-direction: column;
        align-items: center;
    }

    .cart-items,
    .order-summary {
        width: 100%;
    }

    .order-summary {
        margin-right: 0;
        margin-top: 1rem;
        margin-left: 0;
    }

    .card img {
        width: 8rem;  /* Resize image for mobile screens */
    }

    .remove-btn {
        width: 50%;  /* Adjust button width for smaller screens */
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
    this.dispatchEvent(new CustomEvent('remove-from-cart', {
        detail: productToRemove,
        bubbles: true, // Para que el evento atraviese el shadow DOM si es necesario
        composed: true // Para que el evento atraviese los límites entre shadow DOM y el DOM regular
    }));
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
          ? html`
              <p>
                Your cart is empty. Start shopping to add items to your cart!
              </p>
            `
          : this.cart.map(
              product => html`
                <div class="card">
                  <img src="${product.shoe.image}" alt="${product.shoe.name}" />
                  <div class="card-content">
                    <h2>${product.shoe.name}</h2>
                    <div class="flex-row">
                      <span>Size:</span> <strong>${product.size}</strong>
                    </div>
                    <div class="flex-row">
                      <span>Price:</span>
                      <strong class="shoe-price">$${product.shoe.price}</strong>
                    </div>
                    <button
                      class="remove-btn"
                      @click="${() => this.removeFromCart(product)}"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              `
            )}
      </div>
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="order-details">
          <div class="flex-row">
            <span>Subtotal:</span> <span>$${subtotal.toFixed(2)}</span>
          </div>
          <div class="flex-row">
            <span>Gastos de envio:</span>
            <span>$${shippingCost.toFixed(2)}</span>
          </div>
        </div>
        <div class="flex-row">
          <strong>Total:</strong> <strong>$${total.toFixed(2)}</strong>
        </div>
      </div>
    `;
  }
}

customElements.define('shopping-cart', ShoppingCart);
