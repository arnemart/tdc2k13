var buster = require('buster');
var assert = buster.assert;
var transform = require('../js/transform');

buster.testCase('Get and set transform for element', {
    'Get transform': function() {
        ['WebkitTransform', 'MozTransform', 'OTransform', 'transform'].forEach(function(which) {
            var element = {
                style: {}
            };
            element.style[which] = 'translateX(34px) translateY(-12px) rotate(19.221deg) scale(0.9998)';
            var t = transform.get(element);
            assert.equals(t.x, 34);
            assert.equals(t.y, -12);
            assert.equals(t.rotate, 19.221);
            assert.equals(t.scale, 0.9998);
        });
    },
    'Set transform': function() {
        var element = {
            style: {}
        };
        transform.set(element, {
            x: -20,
            y: 101,
            scale: 1.101,
            rotate: 98.111
        });
        assert.equals(element.style.transform, 'translateX(-20px) translateY(101px) scale(1.101) rotate(98.111deg)');
        assert.equals(element.transform, element.WebkitTransform);
        assert.equals(element.transform, element.MozTransform);
        assert.equals(element.transform, element.OTransform);
    }
});