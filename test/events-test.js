var buster = require('buster');
var assert = buster.assert;
var path = require('path');

buster.testCase('Select correct events', {
    'Touch events': function() {
        GLOBAL.navigator = {};
        GLOBAL.document = { body: { ontouchstart: function() {} } };
        delete require.cache[path.resolve('js/events.js')];
        var events = require('../js/events');
        assert.equals(events.start, 'touchstart');
    },
    'Pointer events': function() {
        GLOBAL.navigator = { msMaxTouchPoints: 4 };
        GLOBAL.document = { body: {} };
        delete require.cache[path.resolve('js/events.js')];
        var events = require('../js/events');
        assert.equals(events.start, 'pointerdown');
    },
    'Mouse events': function() {
        GLOBAL.navigator = {};
        GLOBAL.document = { body: {} };
        delete require.cache[path.resolve('js/events.js')];
        var events = require('../js/events');
        assert.equals(events.start, 'mousedown');
    }
});
