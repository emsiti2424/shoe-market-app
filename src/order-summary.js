import { LitElement, html, css } from 'lit-element';

export class OrderSummary extends LitElement {
  static styles = css`
  :host{
    margin-top: 5.7%;
  }
    .order-summary {
      border: 1px solid #ccc;
      padding: 16px;
      margin-right: auto;
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
      </div>
    `;
  }
}

customElements.define('order-summary', OrderSummary);
