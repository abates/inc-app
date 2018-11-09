import '@polymer/iron-label/iron-label.js';
import '@polymer/paper-slider/paper-slider.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
class DeviceSlider extends PolymerElement {
  static get template() {
    return html`
    <style>
      /* local styles go here */
      :host {
        display: block;
      }

      .label {
      }

      .label {
        margin-left: 8px;
      }

      .slider {
        width: 270px;
      }


    </style>
    <iron-label for="device" class="label">{{device.name}}</iron-label>
    <paper-slider id="device" value="0" class="slider"><paper-slider>
  </paper-slider></paper-slider>
`;
  }

  static get is() { return 'device-slider'; }

  static get properties() {
    return {
      device: Object
    }
  }
}

customElements.define('device-slider', DeviceSlider);
