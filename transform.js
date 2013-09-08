var part = function(string, which) {
    var regex = new RegExp(which + '\\((-?\\d+(\\.\\d+)?\\w*)\\)');
    var result = string.match(regex);
    if (result && result[1]) {
        return parseFloat(result[1]);
    } else {
        return 0;
    }
};

module.exports = {
    set: function(element, pos) {
        var transform = 'translateX(' + pos.x + 'px) ' +
                        'translateY(' + pos.y + 'px) ' +
                        'scale(' + pos.scale + ') ' +
                        'rotate(' + pos.rotate + 'deg)';
        element.style.WebkitTransform = transform;
        element.style.MozTransform = transform;
        element.style.OTransform = transform;
        element.style.transform = transform;
        return element;
    },

    get: function(element) {
        var transform = element.style.WebkitTransform ||
                        element.style.MozTransform ||
                        element.style.OTransform ||
                        element.style.transform;
        
        if (transform && transform.length) {
            return {
                x: part(transform, 'translateX'),
                y: part(transform, 'translateY'),
                scale: part(transform, 'scale'),
                rotate: part(transform, 'rotate')
            };
        } else {
            return {
                x: 0,
                y: 0,
                scale: 1,
                rotate: 0
            }
        }
    }
};