Element.prototype.on = Element.prototype.addEventListener;
NodeList.prototype.each = function(fun) {
    Array.prototype.forEach.call(this, fun);
};
// Wrap in a function to avoid "illegal invocation" errors
module.exports = function(sel) {
    return document.querySelectorAll(sel);
};