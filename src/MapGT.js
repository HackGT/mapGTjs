import { Area } from './Area';

export default class MapGT {
    constructor(filePath, parentContainerID="map") {
        this._filePath = filePath;
        this._parentContainerID = parentContainerID;
        this._parentContainer = document.getElementById(this._parentContainerID);
        if (!this._parentContainer) {
            console.error(`parent container with id ${this._parentContainerID} could not be found.`)
        }
        this._mapObjectTag = this._createMap(this._filePath);
        
        this._appendedToDOM = false;
        this.showMap();

        this._mapDOM = this._mapObjectTag.contentDocument;
        if (!this._mapDOM) {
            console.warn(`contentDocument of the SVG is null and SVG DOM manipulation will not be possible. Try setting up a simple server to by pass the CORS issue.
Suggested solution for dev: python -m http.server`);
        }
    }

    // appends the mapObjectTag to the DOM if not already done
    showMap() {
        if (!this._appendedToDOM) {
            this._parentContainer.appendChild(this._mapObjectTag);
            this._appendedToDOM = true;
        } else {
            console.warn("Map has already been appended to the DOM");
        }
    }

    // creates and returns an object tag with the file path
    _createMap(filePath) {
        let mapObjectTag = document.createElement('object');
        mapObjectTag.setAttribute('data', filePath);
        mapObjectTag.setAttribute('type', 'image/svg+xml');
        return mapObjectTag;
    }
}