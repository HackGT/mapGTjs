export class Area {
    constructor(areaDOMGroup, id) {
        this.areaDOMGroup = areaDOMGroup;
        this.id = id;
        this.eventListeners = [];
        this.highlightColor = "red";
    }
    
    addEventListener(el) {
        this.areaDOMGroup.addEventListener(el.type, el.callBack);
    }


// to be implemented
    onMouseHover() {

    }

    // select area as active
    onClick() {
        
    }

    highlight() {
        this.areaDOMGroup.querySelector('path').setAttributeNS(null,
        'fill', "red");
    }

    highlight(color) {
        this.areaDOMGroup.querySelector('path').setAttributeNS(null,
        'fill', color);
    }

    unhighlight() {
        this.areaDOMGroup.querySelector('path').setAttributeNS(null,
        'fill', none); 
    }
}
