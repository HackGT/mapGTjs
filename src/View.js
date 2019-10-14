import { Area } from "./Area";

export class View {
    constructor(viewGroup) { 
        this._viewDOMGroup = viewGroup;
        this.id = this._viewDOMGroup.attributes.id.nodeValue;
        this.areas = [];
        this._populateAreas();
    }

    // gets a specific area from a view
    getArea(id) {
        const dom = this._mapDOM;
        const area = dom.getElementById(id);
        return area; // get area object
    }

    _populateAreas() {
        const areasGroup = this._viewDOMGroup.querySelectorAll(".area");
        for (let group of areasGroup) {
            this.areas.push(new Area(group));
        }
    }
}
