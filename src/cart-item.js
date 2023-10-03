import { LitElement, html, css } from 'lit-element';

export class CartItem extends LitElement {
  static styles = css`
    .card {
      display: flex;
      gap: 6rem;
      padding: 1rem;
      margin-bottom: 1rem;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s;
      background-color: #4b3f72ff;
      color:#69ddffff;
    }

    .card:hover {
      box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
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
      font-family: 'Merriweather', serif;

    }

    .remove-btn {
      background-color: #b59da4ff;
        color: #4b3f72ff;
        border: none;
        padding: 0.2rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        height: 3rem;
        transition: all 0.2s ease-in-out;
        font-family: 'Martian Mono', monospace;
    }
    .remove-btn:hover {
        background-color: #540d6eff;
        color: #b59da4ff;
        cursor: pointer;
        box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
        border: none;
      }
      .remove-btn:active {
        background-color: #540d6eff;
        color: #b59da4ff;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        transform: translateY(2px);
      }
    .shoe-price {
      color: #9f158f;
    }
    @media (max-width: 768px) {
      :host {
        flex-direction: column;
        align-items: center;
      }

      .cart-items {
        width: 100%;
      }

      .card img {
        width: 8rem;
      }

      .remove-btn {
        width: 50%;
        font-size: 0.5rem;
      }
    }
  `;

  static get properties() {
    return {
      product: { type: Object },
    };
  }

  removeFromCart() {
    this.dispatchEvent(
      new CustomEvent('remove-from-cart', {
        detail: this.product,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="card">
        <img src="${this.product.shoe.image}" alt="${this.product.shoe.name}" />
        <div class="card-content">
          <h2>${this.product.shoe.name}</h2>
          <div class="flex-row">
            <span>Size:</span> <strong>${this.product.size}</strong>
          </div>
          <div class="flex-row">
            <span>Price:</span>
            <strong class="shoe-price">$${this.product.shoe.price}</strong>
          </div>
          <button class="remove-btn" @click="${this.removeFromCart}">
            Remove
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('cart-item', CartItem);
