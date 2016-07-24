'use strict';

TLCODE.projects = {
  controller : null,
  slides: ["#slide_1", "#slide_2", "#slide_3"],
  init: function () {
    var self = this;
    //this.controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "100%"}});
    this.controller = new ScrollMagic.Controller();

    this.slides.forEach(function (slide, index) {
      var $bcg = $(slide).find('.bcg');
      var slideParallaxScene = new ScrollMagic.Scene({
        triggerElement: slide,
        //"onEnter" => 1, onCenter" => 0.5, onLeave" => 0
        triggerHook: (index === 0) ? 0 : 1,
        duration: "100%"
      });
      slideParallaxScene.addIndicators();
      slideParallaxScene.setTween(TweenMax.to($bcg, 1, {y: "10%", ease:Power0.easeNone}));
      self.controller.addScene(slideParallaxScene);
    });

  }
};

$( document ).ready(function() {
  //TLCODE.projects.init();
});


