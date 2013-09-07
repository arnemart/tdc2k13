module.exports = function(evt, startPos) {
    
    var pos;
    
    // Double touch
    if (evt.targetTouches && evt.targetTouches.length === 2) {
        var x = evt.targetTouches[0].clientX;
        var y = evt.targetTouches[0].clientY;
        var deltaX = evt.targetTouches[1].clientX - x;
        var deltaY = evt.targetTouches[1].clientY - y;
        pos = {
            x: x,
            y: y,
            distance: Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)),
            angle: Math.atan2(deltaY, deltaX) * 180 / Math.PI
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
};