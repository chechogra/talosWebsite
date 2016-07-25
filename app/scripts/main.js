'use strict';
var TLCODE = window.TLCODE || {};
window.TLCODE = TLCODE;

TLCODE.utils = {
  passiveeventlisteners: false,
  init: function () {
    this.passiveeventlisteners = this.checkSupportsPassive();
  },
  checkSupportsPassive: function (){
    var supportsPassive = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true;
        }
      });
      window.addEventListener("test", null, opts);
    } catch (e) {}

    return supportsPassive;
  }
}

TLCODE.header = {
  shrinkOn: 100,
  hideOn: 600,
  header: null,
  lastScrollDistance: 0,
  init: function(){
    var self = this;
    this.header = $(document.querySelector("header.site-header"));
    window.addEventListener('scroll', function(e){
      var distanceY = window.pageYOffset || document.documentElement.scrollTop;

      if (distanceY > self.hideOn) {

        if(distanceY > self.lastScrollDistance){
          self.header.addClass("menu-hidden");
        }else{
          if (self.header.hasClass("menu-hidden")) {
            self.header.removeClass("menu-hidden");
          }
        }
      }else{
        if (self.header.hasClass("menu-hidden")) {
          self.header.removeClass("menu-hidden");
        }
      }

      if (distanceY > self.shrinkOn) {
        self.header.addClass("smaller");
      } else {
        if (self.header.hasClass("smaller")) {
          self.header.removeClass("smaller");
        }
      }
      self.lastScrollDistance = distanceY;
    }, TLCODE.utils.passiveeventlisteners ? {passive: true} : false);
  }
};

$( document ).ready(function() {
  TLCODE.utils.init();
  TLCODE.header.init();
});
