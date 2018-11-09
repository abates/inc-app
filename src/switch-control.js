import './shared-styles.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import * as Gestures from '@polymer/polymer/lib/utils/gestures.js';

class SwitchControl extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        --switch-color: #dfdcab;
        --switch-background-color: #adab63;
        --switch-slider-color: #fff;

        position: relative;
        display: inline-block;
        width: 40px;
        height: 20px;
        border-radius: 4px;
        border: 2px solid var(--switch-color);
        background-color: var(--switch-background-color);
        z-index: 0;
        vertical-align: middle;
      }

      #slider {
        position: relative;
        height: 80%;
        vertical-align: middle;
        top: 10%;
        width: 40%;
        border-radius: 2px;
        z-index: 2;
        background-color: var(--switch-slider-color);
      }

      #slider.on {
        left: 55%;
        transition: left 0.25s;
      }

      #slider.off {
        left: 5%;
        transition: left 0.25s;
      }

      #background {
        position: absolute;
        top: 0px;
        z-index: 1;
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }

      .split {
        width: 2px;
        height: 60%;
        border-right: 2px solid var(--switch-slider-color);
        top: 50%;
        transform: translateY(-50%);
      }

      .split-left {
        position: absolute;
        left: 15%;
      }

      .split-right {
        position: absolute;
        right: 20%;
      }
    </style>
    <div id="slider"></div>
    <div id="background">
      <div class="split split-left"></div>
      <div class="split split-right"></div>
    </div>
`;
  }

  static get is() { return 'switch-control'; }

  static get properties() {
    return {
      on: {
        type: Boolean,
        value: false,
        notify: true,
        observer: '_updateState'
      },
    }
  }

  constructor() {
    super();
    Gestures.addListener(this, 'tap', this._tapHandler.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    Gestures.removeListener(this, 'tap', this._tapHandler.bind(this));
  }

  _tapHandler(e) {
    this.on = !this.on
    this.dispatchEvent(new Event('switched'));
  }

  _updateState() {
    this._updateSlider(this.on)
  }

  _updateSlider(on) {
    if (on) {
      this.$.slider.classList.remove("off");
      this.$.slider.classList.add("on");
    } else {
      this.$.slider.classList.remove("on");
      this.$.slider.classList.add("off");
    }
  }
}

window.customElements.define(SwitchControl.is, SwitchControl);
