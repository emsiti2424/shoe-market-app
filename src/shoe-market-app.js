import { LitElement, html, css } from 'lit-element';
import './shoe-list.js';
import './shoe-detail.js';
import './shopping-cart.js';

import { router } from 'lit-element-router';
import './app-link.js';
import './app-main.js';

export class ShoeMarketApp extends router(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
      }

      body {
        margin: 0;
        overflow: hidden;
        font: normal 75% Arial, Helvetica, sans-serif;
      }

      .navigation-button {
        border: none;
        background-color: #b59da4;
        border-radius: 50%;
        margin: 1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
      .header-title {
        color: #540d6eff;
        text-shadow: 1px 1px 5px hsla(254, 29%, 35%, 1);
        font-size: 2rem;
        font-weight: 1200;
        font-family: 'Young Serif', serif;
        -webkit-text-stroke: 0.5px #ff9f1cff;


      }

      nav {
        position: relative;
        top: 10%;
        right: 0;
        left: 0;
        width: 100%;
        display: table;
        margin: 0 auto;
        padding: 5px;
        display: flex;
        justify-content: space-between;
      }

      nav button {
        position: relative;
        display: table-cell;
        text-align: center;
        color: #949494;
        text-decoration: none;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: bold;
        transition: 0.2s ease color;

        cursor: pointer;
      }

      nav button:before,
      nav button:after {
        content: '';
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        transition: 0.2s ease transform;
      }

      nav button:before {
        top: 0;
        left: 10px;
        width: 6px;
        height: 6px;
      }

      nav button:after {
        top: 5px;
        left: 18px;
        width: 4px;
        height: 4px;
      }

      nav button:nth-child(1):before {
        background-color: #540d6eff;
      }

      nav button:nth-child(1):after {
        background-color: #540d6eff;
      }

      nav button:nth-child(2):before {
        background-color: #4b3f72ff;
      }

      nav button:nth-child(2):after {
        background-color: #4b3f72ff;
      }

      nav button:nth-child(3):before {
        background-color: purple;
      }

      nav button:nth-child(3):after {
        background-color: palevioletred;
      }

      nav button:hover {
        color: #4b3f72ff;
      }

      nav button:hover:before,
      nav button:hover:after {
        transform: scale(1);
      }

      nav button:nth-child(1):hover ~ #indicator {
        background: linear-gradient(130deg, yellow, red);
      }

      nav button:nth-child(2):hover ~ #indicator {
        left: 34%;
        background: linear-gradient(130deg, #4b3f72ff, #4b3f72ff);
      }

      nav button:nth-child(3):hover ~ #indicator {
        left: 70%;
        background: linear-gradient(130deg, #4b3f72ff, #4b3f72ff);
      }
      #home-icon {
        width: 3rem;
        height: 3rem;
        margin: 0.7rem;
      }
      #car-icon {
        width: 3rem;
        height: 3rem;
        margin: 0.7rem;
      }
      .title-img {
        border-radius: 50%;
        border: 0.5px solid #ff9f1cff;
        box-shadow: 0 0 40px rgba(255, 159, 28, 0.6);
        width: 10rem;
        height: 10rem;
        margin-bottom: 0;
        animation: rotate 25s linear infinite;
        transition: all 0.3s ease-in-out;
        transform-origin: center center;
      }

      @keyframes rotate {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }

      .title {
        font-size: 3rem;
        font-weight: bold;
        margin-top: 2rem;
        text-align: center;
        color: #4b3f72ff;
        text-shadow: 2px 2px #ff9f1cff;
      }

      .header-center {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      .cart-count {
        position: absolute;
        background-color: #540d6eff;
        color: #b59da4ff;
        border-radius: 50%;
        padding: 0.2rem 0.5rem;
        font-size: 0.8rem;
        margin-top: 1.7rem;
        z-index: 10;
      }

      header {
        /*  background-image: url('../assets/background-header.jpg'); */
        background: linear-gradient(
          117deg,
          rgba(181, 157, 164, 1) 0%,
          rgba(84, 13, 110, 1) 8%,
          rgba(105, 221, 255, 1) 19%,
          rgba(255, 159, 28, 1) 35%,
          rgba(158, 65, 157, 1) 53%,
          rgba(75, 63, 114, 1) 71%,
          rgba(255, 159, 28, 1) 83%,
          rgba(31, 151, 196, 1) 88%,
          rgba(0, 212, 255, 1) 100%
        );
        padding-top: 1rem;
        box-shadow: 0 0 10px rgba(255, 159, 28, 1);
        border-bottom: 2px solid transparent;
      }
      .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: #333;
        color: white;
        text-align: center;
        padding: 10px 0;
        margin-top: 5%;
      }

      /* Media Queries for Responsiveness */
      @media only screen and (max-width: 600px) {
        .header-title {
          font-size: 1.5rem;
        }

        nav {
          flex-direction: column;
          align-items: center;
          padding: 10px 0;
        }

        nav button {
          width: 90%;
          margin-top: 10px;
        }

        #home-icon,
        #car-icon {
          width: 2.5rem;
          height: 2.5rem;
        }

        .title-img {
          width: 8rem;
          height: 8rem;
        }
      }
    `;
  }

  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
      query: { type: Object },
      cart: { type: Array },
    };
  }

  static get routes() {
    return [
      {
        name: 'home',
        pattern: '',
        data: { title: 'Home' },
      },
      {
        name: 'carrito',
        pattern: 'carrito',
      },
      {
        name: 'detail',
        pattern: '/detail/:id',
      },
      {
        name: 'not-found',
        pattern: '*',
      },
    ];
  }

  constructor() {
    super();
    this.route = '';
    this.params = {};
    this.query = {};
    this.cart = [];
  }

  get cartCount() {
    return this.cart.length;
  }

  // Este metodo se ejecuta para actualizar el carrito
  handleAddToCart(e) {
    this.cart = [...this.cart, e.detail];
  }
  // Este metodo se ejecuta para eliminar un producto del carrito

  handleRemoveFromCart(e) {
    const productToRemove = e.detail;
    if (!productToRemove || !productToRemove.shoe) {
      console.error('Invalid productToRemove format:', e);
      return;
    }

    // Encuentra el índice del producto que coincide con el ID y la talla
    const productIndex = this.cart.findIndex(
      product =>
        product &&
        product.shoe &&
        product.shoe.id === productToRemove.shoe.id &&
        product.size === productToRemove.size
    );

    // Si se encuentra una coincidencia, elimina solo ese artículo específico
    if (productIndex !== -1) {
      const updatedCart = [...this.cart];
      updatedCart.splice(productIndex, 1);
      this.cart = updatedCart;
    }
  }

  router(route, params, query, data) {
    this.route = route;
    this.params = params;
    this.query = query;
  }

  render() {
    return html`
      <header>
        <div class="header-center">
          <img class="title-img" src="../assets//header-img.jpg" alt="Logo" />
          <h1 class="header-title">Men's Lifestyle Sneakers</h1>
        </div>
        <nav>
          <app-link href="/">
            <button class="navigation-button">
              <!-- Home Icon -->
              <svg
                id="home-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.5315 11.5857L20.75 10.9605V21.25H22C22.4142 21.25 22.75 21.5858 22.75 22C22.75 22.4143 22.4142 22.75 22 22.75H2.00003C1.58581 22.75 1.25003 22.4143 1.25003 22C1.25003 21.5858 1.58581 21.25 2.00003 21.25H3.25003V10.9605L2.46855 11.5857C2.1451 11.8445 1.67313 11.792 1.41438 11.4686C1.15562 11.1451 1.20806 10.6731 1.53151 10.4144L9.65742 3.91366C11.027 2.818 12.9731 2.818 14.3426 3.91366L22.4685 10.4144C22.792 10.6731 22.8444 11.1451 22.5857 11.4686C22.3269 11.792 21.855 11.8445 21.5315 11.5857ZM12 6.75004C10.4812 6.75004 9.25003 7.98126 9.25003 9.50004C9.25003 11.0188 10.4812 12.25 12 12.25C13.5188 12.25 14.75 11.0188 14.75 9.50004C14.75 7.98126 13.5188 6.75004 12 6.75004ZM13.7459 13.3116C13.2871 13.25 12.7143 13.25 12.0494 13.25H11.9507C11.2858 13.25 10.7129 13.25 10.2542 13.3116C9.76255 13.3777 9.29128 13.5268 8.90904 13.9091C8.52679 14.2913 8.37773 14.7626 8.31163 15.2542C8.24996 15.7129 8.24999 16.2858 8.25003 16.9507L8.25003 21.25H9.75003H14.25H15.75L15.75 16.9507L15.75 16.8271C15.7498 16.2146 15.7462 15.6843 15.6884 15.2542C15.6223 14.7626 15.4733 14.2913 15.091 13.9091C14.7088 13.5268 14.2375 13.3777 13.7459 13.3116Z"
                  fill="#1C274C"
                />
                <g opacity="0.5">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.75 9.5C10.75 8.80964 11.3096 8.25 12 8.25C12.6904 8.25 13.25 8.80964 13.25 9.5C13.25 10.1904 12.6904 10.75 12 10.75C11.3096 10.75 10.75 10.1904 10.75 9.5Z"
                    fill="#1C274C"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.75 9.5C10.75 8.80964 11.3096 8.25 12 8.25C12.6904 8.25 13.25 8.80964 13.25 9.5C13.25 10.1904 12.6904 10.75 12 10.75C11.3096 10.75 10.75 10.1904 10.75 9.5Z"
                    fill="#1C274C"
                  />
                </g>
                <path
                  opacity="0.5"
                  d="M12.0494 13.25C12.7142 13.25 13.2871 13.2499 13.7458 13.3116C14.2375 13.3777 14.7087 13.5268 15.091 13.909C15.4732 14.2913 15.6223 14.7625 15.6884 15.2542C15.7462 15.6842 15.7498 16.2146 15.75 16.827L15.75 21.25H8.25L8.25 16.9506C8.24997 16.2858 8.24993 15.7129 8.31161 15.2542C8.37771 14.7625 8.52677 14.2913 8.90901 13.909C9.29126 13.5268 9.76252 13.3777 10.2542 13.3116C10.7129 13.2499 11.2858 13.25 11.9506 13.25H12.0494Z"
                  fill="#1C274C"
                />
                <path
                  opacity="0.5"
                  d="M16 3H18.5C18.7761 3 19 3.22386 19 3.5L19 7.63955L15.5 4.83955V3.5C15.5 3.22386 15.7239 3 16 3Z"
                  fill="#1C274C"
                />
              </svg>
            </button>
          </app-link>
          <app-link href="carrito">
            <span class=" badge-primary cart-count">${this.cartCount}</span>

            <button class="navigation-button">
              <svg
                id="car-icon"
                viewBox="0 0 1024 1024"
                class="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M276.5 529.5l499.4 1.8-25.7 148.4h-433.3z"
                  fill="#8CAAFF"
                />
                <path
                  d="M222.7 356.9L852.3 359.2l-32.4 181.4h-546.3z"
                  fill="#FFFFFF"
                />
                <path
                  d="M399.4 314.9h55.4v347.3h-55.4zM593.4 314.9h55.4v347.3h-55.4z"
                  fill="#333333"
                />
                <path d="M254.3 544.3v-53.1h538.1v53.1z" fill="#333333" />
                <path
                  d="M207.8 221.1l128.7 463.2c3.8 13.9-4.3 28.2-18.2 32-0.1 0-0.1 1-0.2 1v-1c-14 3.8-28.4-4.5-32.3-18.5L157.1 234.6c-3.8-13.9 4.3-28.2 18.2-32h0.2c14-3.8 28.4 4.5 32.3 18.5z"
                  fill="#333333"
                />
                <path
                  d="M75.6 201.6h107.2c14.7 0 26.6 11.9 26.6 26.6v2.5c0 14.7-11.9 26.6-26.6 26.6h-107.2c-14.7 0-26.6-11.9-26.6-26.6v-2.5c0.1-14.7 11.9-26.6 26.6-26.6z"
                  fill="#333333"
                />
                <path
                  d="M301.4 792.8a51.2 48.7 0 1 0 102.4 0 51.2 48.7 0 1 0-102.4 0Z"
                  fill="#333333"
                />
                <path
                  d="M635.2 792.8a51.2 48.7 0 1 0 102.4 0 51.2 48.7 0 1 0-102.4 0Z"
                  fill="#333333"
                />
                <path
                  d="M315.6 662.2h429.3c14.7 0 26.8 11.4 27.8 26.1l0.1 1.7c0.9 14.4-10.1 26.9-24.5 27.8-0.5 0-1.1 0.1-1.6 0.1h-432.8c-14.5 0-26.2-11.7-26.2-26.2 0-0.5 0-1.1 0.1-1.6l0.1-1.7c0.9-14.8 13.1-26.2 27.7-26.2zM235.4 314.9H845.7c14.7 0 26.6 11.9 26.6 26.6V344c0 14.7-11.9 26.6-26.6 26.6h-610.3c-14.7 0-26.6-11.9-26.6-26.6v-2.5c0.1-14.7 12-26.6 26.6-26.6z"
                  fill="#333333"
                />
                <path
                  d="M849.2 317.2l0.8 0.2c15.4 4.1 24.5 19.7 20.4 34.9v0.2l-95.6 343.9c-4.2 15.1-20 24-35.3 20l-0.8-0.2c-15.4-4.1-24.5-19.7-20.4-34.9v-0.2l95.6-343.9c4.2-15.2 20-24.1 35.3-20z"
                  fill="#333333"
                />
              </svg>
            </button>
          </app-link>
        </nav>
      </header>
      <app-main active-route=${this.route}>
        <div route="home"><shoe-list></shoe-list></div>
        <div route="carrito">
          <shopping-cart
            .cart="${this.cart}"
            @remove-from-cart="${this.handleRemoveFromCart}"
          ></shopping-cart>
        </div>
        <div route="detail">
          <shoe-detail
            .id=${this.params.id}
            .cart="${this.cart}"
            @add-to-cart="${this.handleAddToCart}"
          ></shoe-detail>
        </div>
        <div route="not-found">Not Found</div>
      </app-main>
      <footer class="footer">Quiero ser Softtekian</footer>
    `;
  }
}

customElements.define('shoe-market-app', ShoeMarketApp);
