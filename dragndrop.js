var events    = require('./events');
var transform = require('./transform');
var pos    = require('./pos');
var $         = require('./jejkvery');

module.exports = function(element) {
    var touchStart = function(evt) {
        evt.preventDefault();
        var startPos = pos.pos(evt);
        var startTransform = transform.get(element);

        var touchMove = function(evt) {
            evt.preventDefault();
            var curPos = pos.pos(evt);
            if (curPos.multi && !startPos.multi) {
                startPos.multi = true;
                startPos.distance = curPos.distance;
                startPos.angle = curPos.angle;
            } else if (!curPos.multi && startPos.multi) {
                startPos.multi = false;
                startPos.distance = undefined;
                startPos.angle = undefined;
            }
            var delta = pos.delta(curPos, startPos);
            transform.set(element, {
                x: startTransform.x - delta.x,
                y: startTransform.y - delta.y,
                scale: curPos.multi ? (startTransform.scale / startPos.distance) * (startPos.distance + delta.distance) : 1,
                rotate: curPos.multi ? startTransform.rotate + delta.rotate : 0
            });
        };

        var touchEnd = function(evt) {
            evt.preventDefault();
            element.removeEventListener(events.move, touchMove);
            element.removeEventListener(events.end, touchEnd);
            element.removeEventListener(events.cancel, touchEnd);
        };

        element.addEventListener(events.move, touchMove);
        element.addEventListener(events.end, touchEnd);
        element.addEventListener(events.cancel, touchEnd);
        
    };
    element.addEventListener(events.start, touchStart);
};