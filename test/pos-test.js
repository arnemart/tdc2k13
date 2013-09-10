var buster = require('buster');
var assert = buster.assert;
var refute = buster.refute;
var pos = require('../js/pos');

buster.testCase('Get position from event', {
    'Simple event without targetTouches': function() {
        var evt = {
            clientX: 123,
            clientY: 456
        };
        var p = pos.pos(evt);
        refute(p.multi);
        assert.equals(p.x, 123);
        assert.equals(p.y, 456);
    },
    'Single touch with targetTouches': function() {
        var evt = {
            clientX: 12,
            clientY: 34,
            targetTouches: [
                {
                    clientX: 56,
                    clientY: 78
                }
            ]
        };
        var p = pos.pos(evt);
        refute(p.multi);
        assert.equals(p.x, 56);
        assert.equals(p.y, 78);
    },
    'Double touch': function() {
        var evt = {
            targetTouches: [
                {
                    clientX: 100,
                    clientY: 100
                },
                {
                    clientX: 100,
                    clientY: 200
                }
            ]
        };
        var p = pos.pos(evt);
        assert(p.multi);
        assert.equals(p.x, 100);
        assert.equals(p.y, 100);
        assert.equals(p.distance, 100);
        assert.equals(p.rotate, 90);
    },
    'Double touch, different angle': function() {
        var evt = {
            targetTouches: [
                {
                    clientX: 100,
                    clientY: 100
                },
                {
                    clientX: 50,
                    clientY: 100
                }
            ]
        };
        var p = pos.pos(evt);
        assert(p.multi);
        assert.equals(p.x, 100);
        assert.equals(p.y, 100);
        assert.equals(p.distance, 50);
        assert.equals(p.rotate, 180);
    },
    'Triple touch': function() {
        var evt = {
            targetTouches: [
                {
                    clientX: 100,
                    clientY: 100
                },
                {
                    clientX: 50,
                    clientY: 200
                },
                {
                    clientX: 10,
                    clientY: 400
                }
            ]
        };
        var p = pos.pos(evt);
        refute(p.multi);
        assert.equals(p.x, 100);
        assert.equals(p.y, 100);
    }
});

buster.testCase('Get delta between two positions', {
    'Two single touches': function() {
        var p1 = pos.pos({
            clientX: 100,
            clientY: 100
        });
        var p2 = pos.pos({
            clientX: 200,
            clientY: -100
        });
        var delta = pos.delta(p1, p2);
        assert.equals(delta.x, -100);
        assert.equals(delta.y, 200);
        assert.equals(delta.distance, 0);
        assert.equals(delta.rotate, 0);
    },
    'One single and one double': function() {
        var p1 = pos.pos({
            targetTouches: [
                {
                    clientX: 100,
                    clientY: 100
                },
                {
                    clientX: 100,
                    clientY: 200
                }
            ]
        });
        var p2 = pos.pos({
            targetTouches: [
                {
                    clientX: 200,
                    clientY: 0
                }
            ]
        });
        var delta = pos.delta(p1, p2);
        assert.equals(delta.x, -100);
        assert.equals(delta.y, 100);
        assert.equals(delta.distance, 0);
        assert.equals(delta.rotate, 0);
    },
    'Two doubles': function() {
        var p1 = pos.pos({
            targetTouches: [
                {
                    clientX: 100,
                    clientY: 100
                },
                {
                    clientX: 100,
                    clientY: 200
                }
            ]
        });
        var p2 = pos.pos({
            targetTouches: [
                {
                    clientX: 100,
                    clientY: 0
                },
                {
                    clientX: 100,
                    clientY: 50
                }
            ]
        });
        var delta = pos.delta(p1, p2);
        assert.equals(delta.x, 0);
        assert.equals(delta.y, 100);
        assert.equals(delta.distance, 50);
        assert.equals(delta.rotate, 0);
    }
});