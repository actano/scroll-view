
/**
 * Module dependencies.
 */

var Tween = require('tween');
var raf = require('raf');



ScrollView = function(el) {
   this.element = el;
};

ScrollView.prototype.setScrollOffset = function(o){
    this.element.scrollTop = o.top;
    this.element.scrollLeft = o.left;
};

ScrollView.prototype.getScrollOffset = function() {
    return { top: this.element.scrollTop, left: this.element.scrollLeft };
};

ScrollView.prototype.scrollTo = function(x, y, options) {
    options = options || {};

    // start position
    var start = this.getScrollOffset();

    // setup tween
    var tween = Tween(start)
        .ease(options.ease || 'out-circ')
        .to({ top: y , left: x })
        .duration(options.duration || 1000);

    // scroll
    _this = this;
    tween.update(function(o){
        //console.log("left " + o.left);
        _this.setScrollOffset(o);
    });

    // handle end
    tween.on('end', function(){
        animate = function(){};
    });

    // animate
    function animate() {
        raf(animate);
        tween.update();
    }

    animate();
}

module.exports = ScrollView;