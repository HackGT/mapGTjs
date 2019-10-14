export class Area {
    constructor(areaDOMGroup, id) {
        this.areaDOMGroup = areaDOMGroup;
        this.id = id;
        this.eventListeners = [];
    }
    
    addEventListener(el) {
        this.areaDOMGroup.addEventListener(el.type, el.callBack);
    }

    highlight(color) {
        this.areaDOMGroup.querySelector('path').setAttributeNS(null,
        'fill', color);
    }

    unhighlight() {
        this.areaDOMGroup.querySelector('path').setAttributeNS(null,
        'fill', "transparent"); 
    }
}
