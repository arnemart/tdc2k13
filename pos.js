module.exports = {
    pos: function(evt) {
        var pos;
    
        // Double touch
        if (evt.targetTouches && evt.targetTouches.length === 2) {
            var x = evt.targetTouches[0].clientX;
            var y = evt.targetTouches[0].clientY;
            var deltaX = evt.targetTouches[1].clientX - x;
            var deltaY = evt.targetTouches[1].clientY - y;
            pos = {
                multi: true,
                x: x,
                y: y,
                // Math!
                distance: Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)),
                rotate: Math.atan2(deltaY, deltaX) * 180 / Math.PI
            }
        // Single touch
        } else if (evt.targetTouches && evt.targetTouches.length === 1) {
            pos = {
                x: evt.targetTouches[0].clientX,
                y: evt.targetTouches[0].clientY
            }
        // No touch events
        } else if (!evt.targetTouches) {
            pos = {
                x: evt.clientX,
                y: evt.clientY
            }
        }

        return pos;
    },

    delta: function(pos, startPos) {
        var delta = {
            x: startPos.x - pos.x,
            y: startPos.y - pos.y
        };
        if (pos.multi && !startPos.multi) {
            delta.firstMulti = true;
        } else if (!pos.multi && startPos.multi) {
            delta.lastMulti = true;
        } else if (pos.multi && startPos.multi) {
            delta.distance = startPos.distance - pos.distance,
            delta.rotate = startPos.rotate - pos.rotate
        }
        return delta;
    }
};