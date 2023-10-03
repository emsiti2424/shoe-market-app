// shoe-card.js
import { LitElement, html, css } from 'lit-element';

export class ShoeCard extends LitElement {
  static styles = css`
    .card {
      border: 1px solid #ff9f1c;
      background-color: #b59da4;
      color: #540d6eff;
      padding: 15px;
      border-radius: 5px;
      box-shadow: 2px 2px 5px rgba(255, 159, 28, 1);
      transition: box-shadow 0.3s;
      cursor: pointer;
      max-height: 22rem;
      transition: transform 0.3s ease;
        transform-style: preserve-3d;
        will-change: transform;
    }

    .card:hover {
      box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
    }

    .card-content {
      display: flex;
      align-items: center;
      flex-direction: column;
      position: relative;

    }
    .new-label {
      position: absolute;
      top: -1rem;
      right: 12.5rem;
      background-color: #540d6eff;
      color: #ff9f1cff;
      padding: 5px 10px;
      font-weight: bold;
      box-shadow: 1px 1px 1px hsla(35, 100%, 55%, 1);
      border-radius: 5px;
    }

    .card-details {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      gap: 1rem;
      font-family: 'Martian Mono', monospace;

    }

    .shoe-img {
      width: 15rem;

    }
    .shoe-price {
      font-size: 1.5rem;
      color: #4b3f72ff;
    }
    /* Responsive styles for tablets and smaller screens */
    @media (max-width: 768px) {
      .shoe-img {
        width: 12rem;
      }
      .shoe-price {
        font-size: 1.2rem;
      }
      .card {
        padding: 10px;
      }
      .new-label{
        top: -0.5rem;
      right: 14.2rem;
    }

    /* Responsive styles for very small devices */
    @media (max-width: 576px) {
      .shoe-img {
        width: 9rem;
      }
      .shoe-price {
        font-size: 1rem;
      }
      .card {
        padding: 5px;
      }
    }
  `;

  static get properties() {
    return {
      shoe: { type: Object },
      onCardClick: { type: Function },
    };
  }

  render() {
    return html`
      <div
        class="card"
        tabindex="0"
        @click="${this._handleClick}"
        @keydown="${this._handleKeydown}"
      >
        <div class="card-content">
          ${this.shoe.season === 'new'
            ? html`<span class="new-label">New</span>`
            : null}
          <img
            class="shoe-img"
            src="${this.shoe.image}"
            alt="${this.shoe.name}"
          />
          <div class="card-details">
            <span>${this.shoe.name}</span>
            <span class="shoe-price">${this.shoe.price}</span>
          </div>
        </div>
      </div>
    `;
  }

  _handleClick() {
    this.dispatchEvent(
      new CustomEvent('card-clicked', {
        detail: { id: this.shoe.id },
        bubbles: true,
        composed: true,
      })
    );
  }
  // 3d card effect

  firstUpdated() {
    const card = this.shadowRoot.querySelector('.card');

    card.addEventListener('mousemove', e => {
      const width = card.offsetWidth;
      const height = card.offsetHeight;
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;

      const centerX = width / 2;
      const centerY = height / 2;

      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;

      const percentageX = deltaX / centerX;
      const percentageY = deltaY / centerY;

      const rotationY = 20 * percentageX;
      const rotationX = -20 * percentageY;

      card.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0) rotateY(0)';
    });
  }

  _handleKeydown(e) {
    if (e.code === 'Enter' || e.code === 'Space') {
      this._handleClick();
    }
  }
}

customElements.define('shoe-card', ShoeCard);
