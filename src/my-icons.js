/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<iron-iconset-svg name="my-icons" size="24">
  <svg>
    <defs>
      <g id="logo">
        <path d="m294.322,129.817l-140.256-126.371c-3.079-2.775-7.757-2.777-10.838-0.006l-140.543,126.371c-2.495,2.244-3.35,5.791-2.147,8.924 1.201,3.133 4.208,5.201 7.563,5.201h23.944l111.125-98.928c3.098-2.838 7.85-2.84 10.947,0l111.117,98.928h23.664c3.354,0 6.36-2.066 7.562-5.197 1.204-3.131 0.353-6.678-2.138-8.922z"/>
          <path d="m42.077,156.721v130.816c0,4.473 3.627,8.1 8.101,8.1h196.929c4.474,0 8.101-3.627 8.101-8.1v-130.816l-106.564-94.752-106.567,94.752zm125.632-10.754c2.448-3.744 7.467-4.797 11.212-2.35 15.745,10.287 25.145,27.646 25.145,46.438 0,30.58-24.858,55.459-55.412,55.459-30.549,0-55.402-24.879-55.402-55.459 0-18.789 9.399-36.15 25.145-46.438 3.744-2.447 8.765-1.395 11.212,2.35 2.448,3.744 1.395,8.766-2.351,11.213-11.148,7.285-17.804,19.574-17.804,32.875 0,21.646 17.585,39.258 39.2,39.258 21.62,0 39.21-17.611 39.21-39.258 0-13.301-6.655-25.59-17.805-32.875-3.745-2.447-4.798-7.466-2.35-11.213zm-10.954-3.267v47.355c0,4.473-3.627,8.1-8.101,8.1s-8.101-3.627-8.101-8.1v-47.355c0-4.475 3.627-8.102 8.101-8.102s8.101,3.627 8.101,8.102z"/>
      </g>

      <g id="arrow-back">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
      </g>

      <g id="menu">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
      </g>

      <g id="chevron-right">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
      </g>

      <g id="close">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
      </g>

      <g id="home">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
      </g>

      <g id="lightbulb">
        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path>
      </g>

      <g id="switch">
        <!-- top/left corner and left line -->
        <path d="M2 4c-1 0-2 1-2 2v12h2v-14h-2"></path>

        <!-- bottom/left corner and bottom line-->
        <path d="M0 18c0 1 1 2 2 2h20v-2h-22z"></path>

        <!-- bottom/right corner and right line -->      
        <path d="M22 20c1 0 2 -1 2-2v-12h-2v14h2z"></path>

        <!-- top/right corner and top line -->
        <path d="M24 6c0-1-1-2-2-2h-20v2h22z"></path>
        <!-- inner box -->
        <path d="M12 7v10h9v-10z"></path>
      </g>
    </defs>
  </svg>
</iron-iconset-svg>`;

document.head.appendChild($_documentContainer.content);
