import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class IncComponent extends PolymerElement {
  static get template() {
    return html``;
  }

  static get is() { return 'inc-component'; }

  static get properties() {
    return {
      name: {
        type: String
      },
      component: {
        type: Object
      },
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.element = document.createElement(`inc-${this.name}`);
    this.root.appendChild(this.element);
  }
}

window.customElements.define(IncComponent.is, IncComponent);
