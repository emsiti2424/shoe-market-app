import { LitElement, html, css } from 'lit-element';
import { navigator } from 'lit-element-router';
import './shoe-filter.js';

import './shoe-card.js';

export class ShoeList extends navigator(LitElement) {
  static styles = css`
    :host {
      display: block;
    }
    .container {
      display: flex;
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 20px;
    }

    /* Responsive Styles */
    @media only screen and (max-width: 1000px) {
      .grid-container {
        grid-template-columns: repeat(2, 1fr);
      }
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

      .grid-container {
        grid-template-columns: 1fr;
        max-width: 350px;
        justify-content: center;
        margin: 0 auto;
      }
    }
  `;

  static get properties() {
    return {
      shoes: { type: Array },
      selectedBrand: { type: String },
      selectedCategory: { type: String },
      selectedSize: { type: Number },
    };
  }

  constructor() {
    super();

    this.shoes = [];
    this.selectedBrand = null;
    this.selectedCategory = null;
    this.selectedSize = null;
  }

  async fetchContacts() {
    const response = await fetch(
      'https://my-json-server.typicode.com/claumartinezh/training-db/shoes'
    );
    const data = await response.json();
    this.shoes = data;
    console.log(this.shoes);
  }

  firstUpdated() {
    this.fetchContacts();
  }

  handleCategoryChanged(event) {
    this.selectedCategory = event.detail;
    this.requestUpdate();
  }

  handleSizeChanged(event) {
    this.selectedSize = event.detail;
    this.requestUpdate();
  }

  handleBrandChanged(event) {
    this.selectedBrand = event.detail;
    this.requestUpdate();
  }

  filterShoes() {
    return this.shoes.filter(
      shoe =>
        (!this.selectedBrand || shoe.brand === this.selectedBrand) &&
        (!this.selectedCategory || shoe.category === this.selectedCategory) &&
        (!this.selectedSize ||
          (Array.isArray(shoe.size) && shoe.size.includes(this.selectedSize)))
    );
  }

  getUniqueSizes() {
    const allSizes = [];
    this.shoes.forEach(shoe => {
      allSizes.push(...shoe.size);
    });
    return [...new Set(allSizes)].sort((a, b) => a - b);
  }

  getUniqueBrands(shoes) {
    const allBrands = shoes.map(shoe => shoe.brand);
    return [...new Set(allBrands)];
  }

  getUniqueCategories(shoes) {
    const allCategories = shoes.map(shoe => shoe.category);
    return [...new Set(allCategories)];
  }

  navigateToDetail(e) {
    const shoeId = e.detail.id;
    this.navigate(`/detail/${shoeId}`);
  }

  render() {
    const filteredShoes = this.filterShoes();
    const shoesToRender = filteredShoes.length > 0 ? filteredShoes : this.shoes;
    return html`
      <div class="container">
        <shoe-filter
          .uniqueSizes="${this.getUniqueSizes()}"
          .uniqueBrands="${this.getUniqueBrands(this.shoes)}"
          .uniqueCategories="${this.getUniqueCategories(this.shoes)}"
          @category-changed="${this.handleCategoryChanged}"
          @size-changed="${this.handleSizeChanged}"
          @brand-changed="${this.handleBrandChanged}"
        ></shoe-filter>
        <div class="grid-container">
          ${shoesToRender.map(
            shoe => html`
              <shoe-card
                .shoe="${shoe}"
                @card-clicked="${this.navigateToDetail}"
              ></shoe-card>
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('shoe-list', ShoeList);
