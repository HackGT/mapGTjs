import { Area } from './Area';
import { View } from './View';

/*
    TODOS:
        React integration
        updating the url based on what is chosen / clicked
        updating the map based on the url passed in
        dropping a pin
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
            this.setActiveView("view0");
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

    setDefaultPin(fileName) {
        this.pinImagePath = fileName;
    }

    // creates and returns an object tag with the file path
    _createMap(filePath) {
        let mapObjectTag = document.createElement('object');
        mapObjectTag.setAttribute('data', filePath);
        mapObjectTag.setAttribute('type', 'image/svg+xml');
        return mapObjectTag;
    }

    _populateViews() {
        Array.from(this._mapDOM.querySelectorAll(".view")).map(view => {
            this.views.push(new View(view));
        });
    }

    setActiveView(id) {
        const newActiveView = this._mapDOM.getElementById(id);
        if (newActiveView) {
            this.currentView.setAttributeNS(null, "visibility", "hidden");
            this.currentView = newActiveView;
            this.currentView.setAttributeNS(null, "visibility", "visible");
            document.getElementById(id + "switcher").checked = true;
        }
    }

    popupAt(x, y, data={}) {
        const card = document.createElement("div");
        card.style.top = `${x}px`;
        card.style.left = `${y}px`;
        card.classList.add("card");
    
        card.appendChild(this._createTitleDiv());
        document.body.appendChild(card);
    }

    dropPinAt(x, y) {
        const pin = document.createElement("div"),
            img = document.createElement("img");
        img.src = this.pinImagePath;
        img.style.width = "50px";
        pin.style.position = "absolute";
        pin.style.top = `${x}px`;
        pin.style.left = `${y}px`;
        pin.classList.add("pin");
        pin.appendChild(img);

        document.body.appendChild(pin);
    }

    _createTitleDiv() {
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("card-title");
        titleDiv.setAttribute("id", "event-name");
        return titleDiv;
    }
    
    _createCardPointerDiv() {
        const cardPointerDiv = document.createElement("div");
        cardPointerDiv.classList.add("card-pointer");
        return cardPointerDiv;
    }
    
    addViewSwitcher() {
        console.log("adding view switcher");
        const viewSwitcher = document.createElement("div");
        viewSwitcher.classList.add("view-switcher");
        for (let i = 0; i < this.views.length; i++) {
            const viewSwitcherOption = document.createElement("div"),
                radioBtn = document.createElement("input"),
                label = document.createElement("label");

            radioBtn.setAttribute("id", this.views[i].id + "switcher");
            radioBtn.setAttribute("type", "radio");
            radioBtn.setAttribute("name", "view");

            radioBtn.addEventListener("change", (e) => {
                if (e.target.checked) {
                    this.setActiveView(this.views[i].id);
                }
            })

            label.setAttribute("for", this.views[i].id + "switcher");
            label.innerHTML = `${i + 1}`;

            viewSwitcherOption.classList.add("view-switcher-option");
            viewSwitcherOption.appendChild(radioBtn);
            viewSwitcherOption.appendChild(label);

            viewSwitcher.appendChild(viewSwitcherOption);
        }
        this._parentContainer.appendChild(viewSwitcher);
    }
}
