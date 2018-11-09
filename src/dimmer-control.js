import './shared-styles.js';
import './switch-control.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import * as Gestures from '@polymer/polymer/lib/utils/gestures.js';

class DimmerControl extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        --dimmer-color: #dfdcab;
        --dimmer-background-color: #212121;
        --dimmer-slider-color: #adab63;

        position: relative;
        display: inline-block;
        margin: 5px;
        vertical-align: top;
        width: 60px;
        height: 150px;
        border-radius: 5px;
        border: 2px solid var(--dimmer-color);
        background-color: var(--dimmer-background-color);
        padding: 0;
        padding-top: 2px;
        z-index: 0;
      }

      .edit-button {
        color: var(--primary-text-color);
      }

      .label {
        color: var(--app-primary-text-color);
      }

      #slider {
        width: 94%;
        height: 14%;
        left: 2px;
        border-radius: 2px;
        background-color: var(--dimmer-slider-color);
        position: relative;
        z-index: 2;
      }

      #container {
        width: 100%;
        height: 78%;
        z-index: 2;
      }

      switch-control {
        position: absolute;
        bottom: 2px;
        height: 16%;
        width: 94%;
        border: 0;
        border-radius: 0 0 2px 2px;
        z-index: 2;
        margin: 0 2px 0 2px;
        background-color: var(--dimmer-slider-color);
      }

      #background {
        border-radius: 3px;
        position: absolute;
        background: linear-gradient(var(--dimmer-color), var(--dimmer-background-color));
        background-position: left bottom;
        width: 100%;
        bottom: 0;
        z-index: 1;
      }
    </style>
    <div id="container">
      <div id="slider" on-track="_handleDrag"></div>
    </div>
    <switch-control id="switch" on-switched="_switched"></switch-control>
    <div id="background"></div>
`;
  }

  static get is() { return 'dimmer-control'; }

  static get properties() {
    return {
      device: Object,
      value: {
        type: Number,
        value: 0,
        notify: true,
        observer: "_updateValue"
      },
      min: {
        type: Number,
        value: 0
      },
      max: {
        type: Number,
        value: 1.0
      }
    }
  }

  connectedCallback() {
    this._box = this.getBoundingClientRect();
    this.$.background.style.backgroundSize = `100% ${this.offsetHeight}px`;
    this._rangeY = this.$.container.offsetHeight - this.$.slider.offsetHeight;
    this._connected = true;
    this._updateValue();
  }

  _switched() {
    if (this.$.switch.on) {
      this.value = this.max;
    } else {
      this.value = this.min;
    }
  }

  _updateValue() {
    if (!this._connected) {
      return
    } else if (this.value < this.min || this.max < this.value) {
      throw `Value out of range: ${this.value} should be between ${this.min} and ${this.max}`;
    }

    if (!this._dragging) {
      var ratio = (this.value - this.min)/(this.max-this.min);
      this.$.slider.style.transition = "top 0.5s";
      this.$.background.style.transition = "height 0.5s";
      var cb = (e) => {
        this.$.slider.style.transition = "";
        this.$.background.style.transition = "";
        e.target.removeEventListener("transitionend", cb);
      }

      this.$.slider.addEventListener("transitionend", cb);
      this._adjustSlider(this._rangeY - this._rangeY * ratio);
    }
  }

  _handleDrag(e) {
    e.preventDefault();
    switch (e.detail.state) {
      case 'start':
        this._dragStart(e);
        break;
      case 'track':
        this._drag(e);
        break;
      case 'end':
        this._dragEnd(e);
        break;
    }
  }

  _dragStart(e) {
    this._dragging = true
    this._startY = this.$.slider.getBoundingClientRect().y - this._box.y;
    this._minY = -this._startY;
    this._maxY = this._rangeY - this._startY;
  }
  
  _drag(e) {
    if (!this._dragging) {
      _dragStart(e);
    }

    var dy = Math.min(this._maxY, Math.max(this._minY, e.detail.dy));
    this._adjustSlider(this._startY + dy);
    var ratio = (this._startY + dy) / this._rangeY;
    this.value = this.max - (this.min + ratio * (this.max-this.min))
    if (this.value > this.min) {
      this.$.switch.on = true;
    } else {
      this.$.switch.on = false;
    }
  }

  _dragEnd(e) {
    this._dragging = false
  }

  _adjustSlider(newY) {
    if (!this._connected) {
      return;
    }

    this.$.slider.style.top = `${newY}px`;
    this.$.background.style.height = `${this.clientHeight - newY}px`;
  }
}

window.customElements.define(DimmerControl.is, DimmerControl);
