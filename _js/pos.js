module.exports = {
    // Get position(s) from an event
    pos: function(evt) {
        // Double touch
        if (evt.targetTouches && evt.targetTouches.length === 2) {
            var x = evt.targetTouches[0].clientX;
            var y = evt.targetTouches[0].clientY;
            var deltaX = evt.targetTouches[1].clientX - x;
            var deltaY = evt.targetTouches[1].clientY - y;
            return {
                multi: true,
                x: x,
                y: y,
                // Math!
                distance: Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)),
                rotate: Math.atan2(deltaY, deltaX) * 180 / Math.PI
            };

        // Single touch
        } else if (evt.targetTouches && (evt.targetTouches.length === 1 || evt.targetTouches.length > 2)) {
            return {
                x: evt.targetTouches[0].clientX,
                y: evt.targetTouches[0].clientY
            };

        // No touch events
        } else if (!evt.targetTouches) {
            return {
                x: evt.clientX,
                y: evt.clientY
            };
        }
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
