import { LitElement, html, css } from 'lit-element';

export class ShoeFilter extends LitElement {
  static styles = css`
    .filter-section {
      flex-basis: 25%;
      padding: 20px;
      border: 1px solid #ff9f1c;
      border-radius: 5px;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
      margin: 1rem;
      height: 50%;
      background-color: #b59da4;
      color: #540d6eff;
      font-size: 1.2rem;
      min-height: 90%;
    }
    .size-button {
      padding: 0.5rem;
      margin: 0.2rem;
      background-color: transparent;
      border: none;
    }
    li {
      list-style: none;
      cursor: pointer;
    }
    .filter-item {
      margin-bottom: 1rem;
    }
    .selected {
      font-weight: bold;
      cursor: pointer;
      color: blue;

      border-radius: 0.5rem;
    }
    @media only screen and (max-width: 700px) {
      .container {
        flex-direction: column;
        align-items: center;
      }

      .filter-section {
        flex-basis: 100%;
        margin-bottom: 20px;
      }
    }
  `;

  static get properties() {
    return {
      selectedBrand: { type: String },
      selectedCategory: { type: String },
      selectedSize: { type: Number },
      uniqueSizes: { type: Array },
      uniqueBrands: { type: Array },
      uniqueCategories: { type: Array },
    };
  }

  constructor() {
    super();
    this.selectedBrand = null;
    this.selectedCategory = null;
    this.selectedSize = null;
    this.uniqueSizes = [];
    this.uniqueBrands = [];
    this.uniqueCategories = [];
  }
  // Este metodo se encarga de cuando se hace click en un boton de filtrado de la lista de zapatos
  handleCategoryClick(category) {
    // Este condicion verifica si el boton seleccionado es el mismo que el actualmente seleccionado
    if (this.selectedCategory === category) {
      // Si es el mismo, entonces se deselecciona
      this.selectedCategory = null;
    } else {
      // Si no es el mismo, entonces se selecciona
      this.selectedCategory = category;
    }
    // se envia el evento category-changed para que el componente padre sepa que se ha cambiado la categoria
    this.dispatchEvent(
      new CustomEvent('category-changed', {
        detail: this.selectedCategory,
        bubbles: true,
        composed: true,
      })
    );
  }

  handleSizeClick(size) {
    if (this.selectedSize === size) {
      this.selectedSize = null;
    } else {
      this.selectedSize = size;
    }
    this.dispatchEvent(
      new CustomEvent('size-changed', {
        detail: this.selectedSize,
        bubbles: true,
        composed: true,
      })
    );
  }

  handleBrandClick(brand) {
    if (this.selectedBrand === brand) {
      this.selectedBrand = null;
    } else {
      this.selectedBrand = brand;
    }
    this.dispatchEvent(
      new CustomEvent('brand-changed', {
        detail: this.selectedBrand,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="filter-section">
        <h2>Filter</h2>
        <div class="filter-item">
          <label>Category:</label>
          <ul id="category">
            <li
              @click="${() => this.handleCategoryClick(null)}"
              class="${this.selectedCategory === null ? 'selected' : ''}"
            >
              All
            </li>
            ${this.uniqueCategories.map(
              category => html` <li
                @click="${() => this.handleCategoryClick(category)}"
                class="${this.selectedCategory === category ? 'selected' : ''}"
              >
                ${category}
              </li>`
            )}
          </ul>
        </div>
        <div class="filter-item">
          <label>Size:</label>
          <div id="size">
            <button
              @click="${() => this.handleSizeClick(null)}"
              class="size-button ${this.selectedSize === null
                ? 'selected'
                : ''}"
            >
              All
            </button>
            ${this.uniqueSizes.map(
              size => html` <button
                @click="${() => this.handleSizeClick(size)}"
                class="size-button ${this.selectedSize === size
                  ? 'selected'
                  : ''}"
              >
                ${size}
              </button>`
            )}
          </div>
        </div>
        <div class="filter-item">
          <label>Brand:</label>
          <ul id="brand">
            <li
              @click="${() => this.handleBrandClick(null)}"
              class="${this.selectedBrand === null ? 'selected' : ''}"
            >
              All
            </li>
            ${this.uniqueBrands.map(
              brand => html` <li
                @click="${() => this.handleBrandClick(brand)}"
                class="${this.selectedBrand === brand ? 'selected' : ''}"
              >
                ${brand}
              </li>`
            )}
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define('shoe-filter', ShoeFilter);
