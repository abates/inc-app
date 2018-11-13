import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-dialog/paper-dialog.js';

import '../../switch-control.js';
import '../../shared-styles.js';

class IncSwitches extends GestureEventListeners(PolymerElement) {
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
          cursor: pointer;
        }

        paper-dialog {
          background-color: var(--app-primary-color);
          color: var(--app-primary-text-color);
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
          <div class="label" on-tap="openDialog" data-item$="[[index]]">{{ switch.name }}</div>
        </div>
      </template>

      <paper-dialog id="dialog">
        <h2>[[ currentDevice.name ]]</h2>
      </paper-dialog>

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

  openDialog(e) {
    this.currentDevice = this.switches[e.target.dataset.item];
    this.$.dialog.open();
  }
}

window.customElements.define(IncSwitches.is, IncSwitches);
