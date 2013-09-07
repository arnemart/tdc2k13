module.exports = {
    set: function(element, x, y, zoom, rotation) {
    
        return element;
    },
    get: function(element) {
        return {
            x: 0,
            y: 0,
            zoom: 1,
            rotation: 0
        };
    }
}
