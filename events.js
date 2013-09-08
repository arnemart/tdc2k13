module.exports =
(navigator.msMaxTouchPoints > 0) ?
    // Use pointer events on IE
    {
        start: 'pointerdown',
        move: 'pointermove',
        end: 'pointerup',
        cancel: 'pointercancel'
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