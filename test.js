const map = new MapGT("./maps/test.svg");
map.setDefaultPin("./location-pin.svg");
(async () => {
    let x = await map.findCenter("goji");
    console.log(x);
    map.dropPinAt(x[0], x[1]);
})();