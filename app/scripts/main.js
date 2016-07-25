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
  headerElement: null,
  hamburgerElement: null,
  lastScrollDistance: 0,
  init: function(){
    var self = this;
    self.headerElement = $(document.querySelector("header.site-header"));

    self.hamburgerElement = this.headerElement.find(".hamburger");
    self.hamburgerElement.click(self.handleHamburgerClick);

    window.addEventListener('scroll', self.handleScrollEvent, TLCODE.utils.passiveeventlisteners ? {passive: true} : false);
  },
  handleHamburgerClick: function (e) {
    var self = TLCODE.header;
    self.hamburgerElement.toggleClass("is-active");
  },
  handleScrollEvent: function () {
    var self = TLCODE.header;
    var distanceY = window.pageYOffset || document.documentElement.scrollTop;

    if (distanceY > self.hideOn) {

      if(distanceY > self.lastScrollDistance){
        self.headerElement.addClass("menu-hidden");
      }else{
        if (self.headerElement.hasClass("menu-hidden")) {
          self.headerElement.removeClass("menu-hidden");
        }
      }
    }else{
      if (self.headerElement.hasClass("menu-hidden")) {
        self.headerElement.removeClass("menu-hidden");
      }
    }

    if (distanceY > self.shrinkOn) {
      self.headerElement.addClass("smaller");
    } else {
      if (self.headerElement.hasClass("smaller")) {
        self.headerElement.removeClass("smaller");
      }
    }
    self.lastScrollDistance = distanceY;
  }
};

$( document ).ready(function() {
  TLCODE.utils.init();
  TLCODE.header.init();
});
