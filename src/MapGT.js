import { Area } from './Area';
import { View } from './View';

/*
    TODOS:
        React integration
        pop up card dropping functionality
 */

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
        this._mapObjectTag.onload = (e) => {
            this._mapDOM = e.target.contentDocument;
            if (!this._mapDOM) {
                console.warn(`contentDocument of the SVG is null and SVG DOM manipulation will not be possible. Try setting up a simple server to by pass the CORS issue.
    Suggested solution for dev: python -m http.server`);
                return;
            }
            this.views = [];
            this.areas = [];
            this._populateViews();
            this.currentView = Array.from(this._mapDOM.querySelectorAll(".view"))
                .filter(el => el.attributes.visibility.nodeValue == "visible")[0];
            this.addViewSwitcher();
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

    _populateViews() {
        const views = this._mapDOM.querySelectorAll(".view");
        for (let view of views) {
            this.views.push(new View(view));
        }
    }

    addViewSwitcher() {
        const viewSwitcher = document.createElement("div");
        viewSwitcher.classList.add("view-switcher");
        for (let i = 0; i < this.views.length; i++) {
            const viewSwitcherOption = document.createElement("div"),
                radioBtn = document.createElement("input"),
                label = document.createElement("label");

            if (i == 0) {
                radioBtn.checked = true;
            }
            radioBtn.setAttribute("id", this.views[i].id);
            radioBtn.setAttribute("type", "radio");
            radioBtn.setAttribute("name", "view");

            radioBtn.addEventListener("change", (e) => {
                if (e.target.checked) {
                    this.setActiveView(this.views[i].id);
                }
            })

            label.setAttribute("for", this.views[i].id);
            label.innerHTML = `${i + 1}`;

            viewSwitcherOption.classList.add("view-switcher-option");
            viewSwitcherOption.appendChild(radioBtn);
            viewSwitcherOption.appendChild(label);

            viewSwitcher.appendChild(viewSwitcherOption);
        }
        this._parentContainer.appendChild(viewSwitcher);
    }

    setActiveView(id) {
        this.currentView.setAttributeNS(null, "visibility", "hidden");
        this.currentView = this._mapDOM.getElementById(id);
        this.currentView.setAttributeNS(null, "visibility", "visible"); 
    }
}
