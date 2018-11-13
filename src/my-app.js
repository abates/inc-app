/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './inc-component.js';
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-background-color: #212121;
          --app-primary-text-color: #879aa9;
          --app-primary-color: #2b2e3c;
          --app-secondary-color: #354057;
          --app-drawer-width: 56px;

          --app-light-on-color: #ff8800;
          --app-light-off-color: var(--app-primary-text-color);
          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        app-drawer {
          --app-drawer-content-container: {
            background-color: var(--app-primary-color);
          }
        }

        .drawer-list {
          margin: 0;
        }

        .drawer-list div.iron-selected {
          background: linear-gradient(to right top, #6d80fe, #23d2fd);
          font-weight: bold;
        }

        .drawer-list div.iron-selected iron-icon {
          color: #fff;
        }

        app-drawer .logo {
          color: #4285f4;
        }

        app-drawer .logo img {
          display: block;
          padding: 16px 12px 16px 12px;
        }

        .drawer-list iron-icon {
          color: var(--app-primary-text-color);
          display: block;
          padding: 8px 16px;
          cursor: pointer;
        }

        .drawer-list iron-icon:hover {
          color: #4285f4;
          display: block;
          padding: 8px 16px;
        }
        
        iron-selector:after {
          margin-top: 8px;
          background-color: var(--app-primary-text-color);
          content: "";
          display: block;
          height: 1px;
          pointer-events: none;
          position: relative;
          left: 50%;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
          width: 24px;
        }

        iron-pages {
          margin-left: 20px;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <div class="logo"><img src="/images/logo.png"></div>
          <iron-selector selected="{{page}}" attr-for-selected="name" class="drawer-list" role="navigation">
            <div name="home"><a href="[[rootPath]]home"><iron-icon icon="my-icons:home" alt="Home"></iron-icon></a></div>
            <template is="dom-repeat" items="[[componentItems()]]" as="component">
            <div name="[[component.id]]">
              <a href="[[rootPath]][[component.id]]">
                <iron-icon icon$="my-icons:[[component.icon]]" alt="[[component.name]]"></iron-icon>
              </a>
            </div>
            </template>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="">My App</div>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <div name="home"><h1>HOME!</h1></div>
            <template is="dom-repeat" items="[[componentItems()]]" as="component">
              <inc-component name="[[component.id]]" component="[[component]]"></inc-component>
            </template>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  constructor() {
    super();
    this.components = {
      'switches': {
        'name': 'On/Off Switches',
        'icon': 'switch'
      },
      'dimmers': {
        'name': 'Dimmers',
        'icon': 'lightbulb'
      }
    }
  }

  componentItems() {
    var items = new Array();

    Object.keys(this.components).sort().forEach( e => {
      var item = Object.assign({}, this.components[e]);
      item.id = e;
      items.push(item);
    });

    return items;
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (page == 'home' || !page) {
      this.page = 'home';
    } else if (page in this.components) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'home':
        break;
      case 'view404':
        import('./my-view404.js');
        break;
      default:
        if (page in this.components) {
          import(`./components/${page}/inc-${page}.js`);
          break;
        } else {
          import('./my-view404.js');
          break;
        }
    }
  }
}

window.customElements.define('my-app', MyApp);
