// Literally don't use this for anything ever

// Add/remove event listeners with on/off (aint nobody got time to write "addEventListener")
Element.prototype.on = Element.prototype.addEventListener;
Element.prototype.off = Element.prototype.removeEventListener;
// We want to write $('something').each(...), of course
NodeList.prototype.each = function(fun) {
    Array.prototype.forEach.call(/* Isn't */this, fun /* ! */);
};
// var $ = require('./jejkvery') and Bob's yer uncle
module.exports = function(sel) {
    return document.querySelectorAll(sel);
};
