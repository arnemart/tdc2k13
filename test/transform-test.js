var buster = require('buster');
var assert = buster.assert;
var transform = require('../js/transform');

buster.testCase('Get and set transform for element', {
    setUp: function() {
        this.element = {
            style: {}
        };
    },
    'Get transform': function() {
        this.element.style.MozTransform = 'translateX(34px) translateY(-12px) rotate(19.221deg) scale(0.9998)';
        var t = transform.get(this.element);
        assert.equals(t.x, 34);
        assert.equals(t.y, -12);
        assert.equals(t.rotate, 19.221);
        assert.equals(t.scale, 0.9998);
        delete this.element.MozTransform;
    }
});