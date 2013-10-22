module.exports =
(navigator.msMaxTouchPoints) ?
    // Use pointer events on IE
    {
        start: 'MSPointerDown',
        move: 'MSPointerMove',
        end: 'MSPointerUp',
        cancel: 'MSPointerOut'
    }
: ('ontouchstart' in document.body) ?
    // Otherwise, use touch events if available
    {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend',
        cancel: 'touchcancel'
    }
:
    // Fall back to mouse events
    {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup',
        cancel: 'mouseout'
    };
