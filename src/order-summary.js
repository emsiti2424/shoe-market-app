import { LitElement, html, css } from 'lit-element';

export class OrderSummary extends LitElement {
  static styles = css`
    :host {
      margin-top: 5.7%;
    }
    .order-summary {
      padding: 16px;
      margin-right: auto;
      margin-left: 2%;
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.45);
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(15px);
      font-family: 'Merriweather', serif;
      color: #69ddffff;
    }

    .order-details {
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;
      color: #ff9f1cff;
    }
    .flex-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
    }
    .finish-order {
      background-color: #b59da4ff;
      color: #4b3f72ff;
      border: none;
      padding: 1rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      height: 3rem;
      transition: all 0.2s ease-in-out;
      font-family: 'Martian Mono', monospace;
    }
    .finish-order:hover {
      background-color: #540d6eff;
      color: #b59da4ff;
      cursor: pointer;
      box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
      border: none;
    }
    .finish-order:active {
      background-color: #540d6eff;
      color: #b59da4ff;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
      transform: translateY(2px);
    }
    @media (max-width: 768px) {
      .order-summary {
        width: 100%;
      }

      .order-summary {
        margin-right: 0;
        margin-top: 1rem;
        margin-left: 0;
      }
    }
  `;

  static get properties() {
    return {
      subtotal: { type: Number },
      shippingCost: { type: Number },
      total: { type: Number },
    };
  }

  render() {
    return html`
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="order-details">
          <div class="flex-row">
            <span>Subtotal:</span> <span>$${this.subtotal.toFixed(2)}</span>
          </div>
          <div class="flex-row">
            <span>Gastos de envio:</span>
            <span>$${this.shippingCost.toFixed(2)}</span>
          </div>
        </div>
        <div class="flex-row">
          <strong>Total:</strong> <strong>$${this.total.toFixed(2)}</strong>
        </div>
        <button class="finish-order">Buy it</button>
      </div>
    `;
  }
}

customElements.define('order-summary', OrderSummary);
