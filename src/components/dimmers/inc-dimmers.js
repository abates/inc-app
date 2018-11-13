import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

import '../../dimmer-control.js';
import '../../shared-styles.js';

class IncDimmers extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }

        .container {
          display: flex;
          flex-wrap: wrap;
        }

        .dimmer {
          display: inline-block;
          flex-grow: 1;
          width: 86px;
          vertical-align: top;
          padding-bottom: 25px;
        }

        dimmer-control {
          width: 64px;
          height: 200px;
          margin: 0 6px 0 6px;
        }

        .label {
          margin: 0 5px 0 5px;
          padding: 0 2px 0 2px;
        }
      </style>

      <iron-ajax 
        id="getDevicesAjax"
        auto 
        url="/api/devices.json" 
        method="get" 
        handle-as="json" 
        on-response="handleResponse">
      </iron-ajax>

      <h1>Dimmers</h1>
      <div class="container">
      <template is="dom-repeat" items="[[lights]]" as="light">
        <div class="dimmer">
          <dimmer-control device="{{light}}"></dimmer-control>
          <div class="label">{{ light.name }}</div>
        </div>
      </template>
      </div>
    `;
  }

  static get is() { return 'inc-dimmers'; }

  static get properties() {
    return {
      lights: [],
    }
  }

  handleResponse(data) {
    this.set("lights", []);

    for (var i=0; i<data.detail.response.length; i++) {
      var light = data.detail.response[i];
      if (light.type != "dimmer") {
        continue;
      }
      this.push("lights", light);
    }
  }
}

window.customElements.define(IncDimmers.is, IncDimmers);
