var events = require('./events');
var transform = require('./transform');
var pos = require('./pos');
require('./jejkvery');

/*
 * So you maybe want to make elements draggable and rotatable and resizable.
 * Usage: var dnd = require('./dragndrop');
 *        dnd(document.getElementById('aaa'));
 * Settings: There are no settings
 */
module.exports = function(element) {
    var touchStart = function(evt) {
        evt.preventDefault();

        // Finger position at touch start
        var startPos = pos.pos(evt);

        // Get element position at touch start
        var startTransform = transform.get(element);

        // Do some z-index stuff to put the currently dragging element on top of the others
        element.style.zIndex = '1';

        var touchMove = function(evt) {
            evt.preventDefault();

            // Current finger position
            var curPos = pos.pos(evt);

            // If a finger just was added, record current angle and distance
            // (Ugh mutable state)
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

            // Get delta between start finger position and current finger position, and move the element accordingly
            var delta = pos.delta(curPos, startPos);
            transform.set(element, {
                x: startTransform.x + delta.x,
                y: startTransform.y + delta.y,
                scale: curPos.multi ? (startTransform.scale / startPos.distance) * curPos.distance : startTransform.scale,
                rotate: curPos.multi ? startTransform.rotate + delta.rotate : startTransform.rotate
            });
        };

        var touchEnd = function(evt) {
            evt.preventDefault();

            // Drop down to z-index 0
            element.style.zIndex = '0';

            // Unbind move, end and cancel events
            element.off(events.move, touchMove);
            element.off(events.end, touchEnd);
            element.off(events.cancel, touchEnd);
        };

        // Wait until touch start to bind move/end/cancel events
        element.on(events.move, touchMove);
        element.on(events.end, touchEnd);
        element.on(events.cancel, touchEnd);

    };

    // Bind touchstart event
    element.on(events.start, touchStart);
};
