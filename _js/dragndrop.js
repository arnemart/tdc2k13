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

        console.log('start');

        // SOME STUFF

        var touchMove = function(evt) {
            evt.preventDefault();

            console.log('move');

            // MAGIC

        };

        var touchEnd = function(evt) {
            evt.preventDefault();

            console.log('end');

            // SECRET

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
