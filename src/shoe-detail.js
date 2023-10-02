import { LitElement, html, css } from 'lit-element';

class ShoeDetail extends LitElement {
  static get styles() {
    return css`
      /* Estilos base para la categoría y el precio del zapato */
      .shoe-category,
      .shoe-price {
        color: #ff9f1cff;
      }
      .shoe-category {
        font-weight: 600;
      }
      .shoe-price {
        font-weight: 800;
      }

      /* Estilo para el selector de talla del zapato */
      .shoe-size-selector {
        padding: 0.4rem;
        height: 50%;
        font-size: 1rem;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
      }

      /* Estilos para la disposición de los detalles del zapato */
      .shoe-details {
        display: flex;
        gap: 8rem;
      }
      .price-size-buy {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 5rem;
      }

      /* Estilos para las imágenes de los zapatos */
      .shoe-img {
        width: 20rem;
        height: 20rem;
      }
      .shoe-extra-img {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
      .shoe-extra-img img {
        width: 5rem;
        height: 5rem;
      }

      /* Estilos generales del contenedor de detalles */
      .details-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        background-color: #4b3f72ff;
      }

      /* Estilos para el nombre de la categoría */
      .category-name {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        color: #b59da4ff;
      }

      /* Estilo para el botón de agregar al carrito */
      .addcart-btn {
        background-color: #b59da4ff;
        color: #4b3f72ff;
        border: none;
        padding: 1rem;
        border-radius: 2rem;
        font-size: 1rem;
        height: 3rem;
      }
      .addcart-btn:hover {
        background-color: #4b3f72ff;
        color: #b59da4ff;
        cursor: pointer;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
      }

      /* Responsive para tablets y dispositivos con pantalla pequeña */
      @media (max-width: 768px) {
        .shoe-details {
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .price-size-buy {
          flex-direction: column;
          gap: 2rem;
        }
        .shoe-img {
          width: 15rem;
          height: 15rem;
        }
        .shoe-extra-img img {
          width: 4rem;
          height: 4rem;
        }
        .details-container {
          gap: 2rem;
        }
      }

      /* Responsive para dispositivos más pequeños */
      @media (max-width: 576px) {
        .shoe-img {
          width: 12rem;
          height: 12rem;
        }
        .shoe-extra-img img {
          width: 3.5rem;
          height: 3.5rem;
        }
      }
    `;
  }

  static get properties() {
    return {
      shoe: { type: Object },
      sizeSelected: { type: Number },
      id: { type: String },
    };
  }
  // El metodo updated se ejecuta cuando se actualiza una propiedad

  updated(changedProperties) {
    // Verifica si la propiedad id cambió y si existe
    if (changedProperties.has('id') && this.id) {
      this.routeDataChanged({ id: this.id });
    }
  }
  // Constructor method que se ejecuta cuando se crea el componente

  constructor() {
    super();
    this.shoe = {};
    this.sizeSelected = null;
  }

  // Este metodo hace el fetch request en el componente de la base de datos
  routeDataChanged({ id }) {
    this.shoe = {};
    // empezar un nuevo fetch
    const fetchRequest = fetch(
      `https://my-json-server.typicode.com/claumartinezh/training-db/shoes/${id}`
    );

    // guardar el fetch request en una propiedad
    this.currentFetchRequest = fetchRequest;

    fetchRequest
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Si el fetch request es el mismo que el que se está ejecutando las propiedades se actualizan
        if (this.currentFetchRequest === fetchRequest) {
          this.shoe = data;
        }
      })
      // Si el fetch request no es, da un error.
      .catch(error => {
        console.log(
          'There was a problem with the fetch operation:',
          error.message
        );
      });
  }

  render() {
    // Si el fetch request no está completo, muestra un mensaje de loading
    if (!this.shoe || !this.shoe.name) return html`<h1>Loading...</h1>`;
    // Si el fetch request está completo, muestra el detalle del zapato
    return html`
      <div class="details-container">
        <div class="price-size-buy">
          <div class="category-name">
            <span class="shoe-category">${this.shoe.category}</span>
            <h2>${this.shoe.name}</h2>
            <div class="shoe-details">
              <p class="shoe-price">$${this.shoe.price}</p>
              <select
                class="shoe-size-selector"
                .value="${this.sizeSelected}"
                @change="${e => {
                  this.sizeSelected = e.target.value;
                }}"
              >
                ${this.shoe.size.map(
                  size => html`<option value="${size}">${size}</option>`
                )}
              </select>
              <button class="addcart-btn" @click="${this.addToCart}">
                Add to Cart
              </button>
            </div>
          </div>

          <img
            class="shoe-img"
            src="${this.shoe.image}"
            alt="${this.shoe.name} Front Image"
          />
          <div class="shoe-extra-img">
            <img
              src="${this.shoe['image-behind']}"
              alt="${this.shoe.name} Behind Image"
            />
            <img
              src="${this.shoe['image-side']}"
              alt="${this.shoe.name} Side Image"
            />
          </div>
        </div>
      </div>
    `;
  }
  // este metodo envia un evento de add-to-cart con los detalles del zapato y el tamaño seleccionado

  addToCart() {
    // Si no se ha seleccionado un tamaño, se selecciona el primer tamaño
    if (!this.sizeSelected) {
      this.sizeSelected = this.shoe.size[0];
    }
    // Aqui se cargar el detalle del zapato y el tamaño seleccionado
    const detail = {
      shoe: this.shoe,
      size: this.sizeSelected,
    };

    // Se envia el evento de add-to-cart con los detalles del zapato y el tamaño seleccionado
    this.dispatchEvent(
      new CustomEvent('add-to-cart', { detail, bubbles: true, composed: true })
    );
  }
}

customElements.define('shoe-detail', ShoeDetail);
