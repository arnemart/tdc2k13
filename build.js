;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./events":2,"./getPos":3,"./jejkvery":4,"./transform":6}],2:[function(require,module,exports){
module.exports =
(navigator.msMaxTouchPoints > 0) ?
{ // Use pointer events on IE
    start: 'pointerdown',
    move: 'pointermove',
    end: 'pointerup',
    cancel: 'pointercancel'
}
: ('ontouchstart' in document.body) ?
{ // Use touch events
    start: 'touchstart',
    move: 'touchmove',
    end: 'touchend',
    cancel: 'touchcancel'
}
:
{ // Use mouse events
    start: 'mousedown',
    move: 'mousemove',
    end: 'mouseup',
    cancel: 'mouseout'
};
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
Element.prototype.on = Element.prototype.addEventListener;
NodeList.prototype.each = function(fun) {
    Array.prototype.forEach.call(this, fun);
};
// Wrap in a function to avoid "illegal invocation" errors
module.exports = function(sel) {
    return document.querySelectorAll(sel);
};
},{}],5:[function(require,module,exports){
var $ = require('./jejkvery');
var dnd = require('./dragndrop');

$('.dnd').each(dnd);

},{"./dragndrop":1,"./jejkvery":4}],6:[function(require,module,exports){
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

},{}]},{},[5])
;