import store, { INCREASE_COUNTER } from '../store';

class Counter extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this._render();
    this._uid = this.getAttribute('uid');
    this._number = store.getState().find((counter => counter.uid==this._uid)).counter || 0;  
    this._theNumberDOM;
    this._addButtonDOM;
    this._subscribeStore();
  }

  connectedCallback() {
    this._theNumberDOM = this.shadowRoot.getElementById('the-number');
    this._addButtonDOM = this.shadowRoot.querySelector('.increase-button');
    this._setNumberInDOM(this._number);
    this._handeOnClick();
  }

  _subscribeStore() {
    store.subscribe(() => {
      this._setNumberInDOM(store.getState().find((counter => counter.uid==this._uid)).counter);
    });
  }

  _setNumberInDOM(num = 0) {
    if(this._theNumberDOM) this._theNumberDOM.innerHTML = num;
  }

  _handeOnClick() {
    this._addButtonDOM.addEventListener('click', () => {
      store.dispatch({
        type: INCREASE_COUNTER,
        uid: Number(this._uid)
      });
    });
  }

  _render() {
    this.shadowRoot.innerHTML = `
      ${this._handleCSS()}
      <div id="counter">
        <h1>Counter: <span id="the-number">0</span></h1>
        <button class="increase-button">➕Add One</button>
      </div>
    `;
  }

  _handleCSS() {
    return(`
      <style>
        #counter {
          background-color: #ccc;
          width: 50%;
          margin: 0 auto;
          border-radius: 5px;
          margin-bottom: 15px;
        }
        #counter h1 {
          margin: 0;
          font-size: 2rem;
          color: #333;
          padding: 1rem;
          text-align: center;
        }
        .increase-button {
          width: 100%;
          background: #333;
          border: 0;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          padding: 0.5rem;
          color: #ffffff;
          cursor: pointer;
          font-family: sans-serif;
          font-weight: bold;
          font-size: 1rem;
        }
      </style>
    `);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(name === 'uid') this._uid = newValue;
  }

  static get observedAttributes() {
    return ['uid'];
  }

}

export default Counter;