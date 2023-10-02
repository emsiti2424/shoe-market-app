import { LitElement, html, css } from 'lit-element';

export class CartItem extends LitElement {
  static styles = css`
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
      width: 60%;
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

      .cart-items {
        width: 100%;
      }

      .card img {
        width: 8rem;
      }

      .remove-btn {
        width: 50%;
      }
    }
  `;

  static get properties() {
    return {
      product: { type: Object },
    };
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
          <button
            class="remove-btn"
            @click="${() =>
              this.dispatchEvent(
                new CustomEvent('remove-from-cart', {
                  detail: this.product,
                  bubbles: true,
                  composed: true,
                })
              )}"
          >
            Remove
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('cart-item', CartItem);
