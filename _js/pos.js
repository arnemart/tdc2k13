module.exports = {
    // Get position(s) from an event
    pos: function(evt) {
        // DO SOME THINGS
    },

    // Calculcate delta between two positions
    delta: function(pos, startPos) {
        var delta = {
            x: pos.x - startPos.x,
            y: pos.y - startPos.y,
            distance: 0,
            rotate: 0
        };
        if (pos.multi && startPos.multi) {
            delta.distance = pos.distance - startPos.distance;
            delta.rotate = pos.rotate - startPos.rotate;
        }
        return delta;
    }
};
