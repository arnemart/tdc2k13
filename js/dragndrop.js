var events = require('./events');
var transform = require('./transform');
var pos = require('./pos');
var $ = require('./jejkvery');

module.exports = function(element) {
    var touchStart = function(evt) {
        evt.preventDefault();
        var startPos = pos.pos(evt);
        var startTransform = transform.get(element);

        var touchMove = function(evt) {
            evt.preventDefault();
            element.style.zIndex = '1';
            var curPos = pos.pos(evt);

            // If a finger just was added, record current angle and distance
            if (curPos.multi && !startPos.multi) {
                startPos.multi = true;
                startPos.distance = curPos.distance;
                startPos.angle = curPos.angle;
            // If a finger just was removed, clear initial angle and distance
            } else if (!curPos.multi && startPos.multi) {
                startPos.multi = false;
                startPos.distance = undefined;
                startPos.angle = undefined;
            }
            var delta = pos.delta(curPos, startPos);
            transform.set(element, {
                x: startTransform.x + delta.x,
                y: startTransform.y + delta.y,
                scale: curPos.multi ? (startTransform.scale / startPos.distance) * (startPos.distance + delta.distance) : startTransform.scale,
                rotate: curPos.multi ? startTransform.rotate + delta.rotate : startTransform.rotate
            });
        };

        var touchEnd = function(evt) {
            evt.preventDefault();
            element.style.zIndex = '0';
            element.off(events.move, touchMove);
            element.off(events.end, touchEnd);
            element.off(events.cancel, touchEnd);
        };

        element.on(events.move, touchMove);
        element.on(events.end, touchEnd);
        element.on(events.cancel, touchEnd);

    };
    element.on(events.start, touchStart);
    element.style.zIndex = '0';
};