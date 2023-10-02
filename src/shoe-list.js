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

  // El fetch se encarga de llamar al servidor para obtener los datos de la base de datos
  async fetchContacts() {
    // Este fetch se encarga de llamar al servidor para obtener los datos de la base de datos
    const response = await fetch(
      'https://my-json-server.typicode.com/claumartinezh/training-db/shoes'
    );
    // Se obtiene el resultado de la peticion al servidor y se guarda en la variable data
    const data = await response.json();
    this.shoes = data;
  }
  // este metodo se encarga de llamar al metodo fetchContacts para obtener los datos de la base de datos, se ejecuta una vez.

  firstUpdated() {
    this.fetchContacts();
  }
  // este metodo se enccrga de coger el evento category-changed para que el componente padre sepa que se ha cambiado la categoria

  handleCategoryChanged(event) {
    this.selectedCategory = event.detail;
    this.requestUpdate();
  }
  // este metodo se encarga de coger el evento size-changed para que el componente padre sepa que se ha cambiado el tamaño

  handleSizeChanged(event) {
    this.selectedSize = event.detail;
    this.requestUpdate();
  }

  // este metodo se encarga de coger el evento brand-changed para que el componente padre sepa que se ha cambiado la marca

  handleBrandChanged(event) {
    this.selectedBrand = event.detail;
    this.requestUpdate();
  }
  // FilteredShoes se encarga de filtrar los datos de la base de datos

  filterShoes() {
    return this.shoes.filter(
      shoe =>
        (!this.selectedBrand || shoe.brand === this.selectedBrand) &&
        (!this.selectedCategory || shoe.category === this.selectedCategory) &&
        (!this.selectedSize ||
          (Array.isArray(shoe.size) && shoe.size.includes(this.selectedSize)))
    );
  }
  // este metodo se encarga de coger los tamaños de los zapatos que se encuentran en la base de datos

  getUniqueSizes() {
    const allSizes = [];
    this.shoes.forEach(shoe => {
      allSizes.push(...shoe.size);
    });
    return [...new Set(allSizes)].sort((a, b) => a - b);
  }

  // Este metodo se encarga de coger las marcas de los zapatos que se encuentran en la base de datos

  getUniqueBrands(shoes) {
    const allBrands = shoes.map(shoe => shoe.brand);
    return [...new Set(allBrands)];
  }
  // Este metodo se encarga de coger las categorias de los zapatos que se encuentran en la base de datos

  getUniqueCategories(shoes) {
    const allCategories = shoes.map(shoe => shoe.category);
    return [...new Set(allCategories)];
  }

  // navigateToDetail se encarga de cambiar el componente padre a la pantalla de detalle de un zapato y coge el id del zapato.

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
