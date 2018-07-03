(function(root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require('jQuery'), require('underscore'));
  } else if (typeof define === 'function' && define.amd) {
    define(['jQuery', 'underscore'], factory);
  } else {
    root.Responsive = factory(root.$, root._);
  }
}(this, function($, _) {
  var layout = false,
    breakpoints = {
      'down-sm': 'only screen and (max-width: 767px)',
      'only-md': 'only screen and (min-width: 768px) and (max-width: 991px)',
      'up-lg': 'only screen and (min-width: 992px)'
    },
    callbacksBr = {
      'down-sm': [],
      'only-md': [],
      'up-lg': []
    },
    callbacksRes = [];

  function isRule(breakpoint) {
    return window.matchMedia(breakpoints[breakpoint]).matches;
  }

  function callBr() {
    var i, j;
    for (breakpoint in breakpoints) {
      if (window.matchMedia(breakpoints[breakpoint]).matches){
        for (layout = breakpoint, i = 0, j = callbacksBr[breakpoint].length; i < j; i++){
          callbacksBr[breakpoint][i]();
        }
      }
    }
  }

  function isIE() {
    return navigator.userAgent.toLowerCase().indexOf('msie') != -1;
  }

  function isRetinaDisplay() {
    return 'devicePixelRatio' in window && window.devicePixelRatio >= 1.9;
  }

  function isTouchDevice() {
    return !isIE() && ('ontouchstart' in window);
  }

  function callRes() {
    for (var i = 0, j = callbacksRes.length; i < j; i++){
      callbacksRes[i]();
    }
  }

  function init() {
    $(document).ready(callBr);
    $(window).resize(function() {
      isRule(layout) || callBr();
    });

    $(window).on('load', _.debounce(callRes, 250));
    $(window).on('resize', _.debounce(callRes, 250));
    $(window).on('orientationchange', _.debounce(callRes, 250));
  }

  init();

  return {
    getCurrentBreakpoint: function() {
      for (breakpoint in breakpoints){
        if (isRule(breakpoint)){
          return breakpoint;
        }
      }
    },
    onBreakpoint: function(fn, br) {
      callbacksBr[br].push(fn);
    },
    onResize: function(fn) {
      callbacksRes.push(fn);
    },
    isTouchDevice: isTouchDevice,
    isRetinaDisplay: isRetinaDisplay,
    isIE: isIE
  };
}));