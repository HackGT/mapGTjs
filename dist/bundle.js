var MapGT=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const r=n(1).default;e.exports=r},function(e,t,n){"use strict";n.r(t);n.d(t,"default",function(){return r});class r{constructor(e,t="map"){this._filePath=e,this._parentContainerID=t,this._parentContainer=document.getElementById(this._parentContainerID),this._parentContainer||console.error(`parent container with id ${this._parentContainerID} could not be found.`),this._mapObjectTag=this._createMap(this._filePath),this._appendedToDOM=!1,this.showMap(),this._mapDOM=this._mapObjectTag.contentDocument,this._mapDOM||console.warn("contentDocument of the SVG is null and SVG DOM manipulation will not be possible. Try setting up a simple server to by pass the CORS issue.\nSuggested solution for dev: python -m http.server")}showMap(){this._appendedToDOM?console.warn("Map has already been appended to the DOM"):(this._parentContainer.appendChild(this._mapObjectTag),this._appendedToDOM=!0)}_createMap(e){let t=document.createElement("object");return t.setAttribute("data",e),t.setAttribute("type","image/svg+xml"),t}}}]);