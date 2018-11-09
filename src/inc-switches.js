import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-dialog/paper-dialog.js';

import './switch-control.js';
import './shared-styles.js';

class IncSwitches extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles iron-flex">
        :host {
          display: block;
          padding: 10px;
        }

        .container {
          display: flex;
          flex-wrap: wrap;
        }

        .switch {
          display: inline-block;
          width: 200px;
          padding: 10px 0 10px 0;
          flex-grow: 1;
        }

        .edit-button {
          display: inline-block;
          color: var(--app-primary-text-color);
          position: relative;
          top: -8px;
        }

        .label {
          display: inline-block;
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

      <h1>Switches</h1>
      <div class="container">
      <template is="dom-repeat" items="[[switches]]" as="switch">
        <div class="switch">
          <switch-control></switch-control>
          <div class="label"><a href="">{{ switch.name }}</a></div>
        </div>
      </template>
      </div>
    `;
  }

  static get is() { return 'inc-switches'; }

  static get properties() {
    return {
      switches: [],
    }
  }

  handleResponse(data) {
    this.set("switches", []);

    for (var i=0; i<data.detail.response.length; i++) {
      var swtch = data.detail.response[i];
      if (swtch.type != "switch") {
        continue;
      }
      this.push("switches", data.detail.response[i]);
    }
  }
}

window.customElements.define(IncSwitches.is, IncSwitches);
