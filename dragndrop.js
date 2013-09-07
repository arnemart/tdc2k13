var events    = require('./events');
var transform = require('./transform');
var getPos    = require('./getPos');
var $         = require('./jejkvery');

console.log(events);

module.exports = function(element) {
    var touchStart = function(evt) {
        evt.preventDefault();
        var startPos = getPos(evt);
        var startTransform = transform.get(element);
        
        var touchMove = function(evt) {
            var pos = getPos(evt, startPos);
            var delta = {
                x: pos.x - startPos.x,
                y: pos.y - startPos.y
            };
            evt.preventDefault();
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