export class View {

    constructor(areaGroup) {
        console.log(areaGroup);
        this.areaGroup = areaGroup;
    }

    // gets a specific area from a view
    getArea(id) {
        const dom = this._mapDOM;
        const area = dom.getElementById(id);
        return area; // get area object
    }
}
