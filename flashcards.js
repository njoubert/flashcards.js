/*!
 * flashcards.js Javascript Library
 * https://github.com/njoubert/flashcards.js
 *
 * Copyright 2011, Niels Joubert
 *
 * This uses the Revealing Module pattern.
 * Do NOT use this pattern if you create lots of objects,
 * it is for revealing a single module with a public API.
 * If you create many objects, functions should live on prototypes,
 * so that you do not duplicate function implementations every time you create an object
 */

(function(global){ 
  var flashcards = function(paneA, paneB) {
    return Flashcard(paneA, paneB);
  }

  var array_shuffle = function(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };


  var Flashcard = function(paneA, paneB, countPane) {
    var self = this;
    var __ELpaneA = document.getElementById(paneA);
    var __ELpaneB = document.getElementById(paneB);
    var __extractor = null;
    var __itemA     = null;
    var __itemB     = null;
    var __shuffle   = true;
    var __config    = {

    };
    
    var __data = [];
    var __current_idx = 0;
    var __paneA_visible = false;
    var __paneB_visible = false;
    var __onchange = null;
     
    //set up event handlers:
    __ELpaneA.onclick = function() {
      if (__paneA_visible) {
        next();
        __paneA_visible = true;
        __paneB_visible = false;
      } else {
        __paneA_visible = true;
      }
      redraw();
      fire_onchange();
    }

    __ELpaneB.onclick = function() {
      if (__paneB_visible) {
        next();
        __paneB_visible = true;
        __paneA_visible = false;
      } else {
        __paneB_visible = true;
      }
      redraw();
      fire_onchange();
    }


    //private functions:
    
    var redraw = function() {
      __ELpaneA.innerHTML = __paneA_visible ? __itemA(__data[__current_idx]) : ""
      __ELpaneB.innerHTML = __paneB_visible ? __itemB(__data[__current_idx]) : ""      
    }
    
  
    var init = function() {
      if (__extractor === null || __itemA === null || __itemB === null)
        return;
      
      __data = __shuffle ? array_shuffle(__extractor()) : __extractor()
      
      __current_idx = 0;
      __paneA_visible = false;
      __paneB_visible = false;
      fire_onchange();
    }
  
    var next = function() {
      if (__current_idx < __data.length-1) {
        __current_idx += 1;
      } else {
        init();
      }
    }
    
    var fire_onchange = function() {
      if (__onchange)
        __onchange(__current_idx,__data.length);
    }
  
    // Public API:
  
    var data = function(fn) {
      __extractor = fn;
      init();
      return this;
    }
  
    var itemA = function(fn) {
      __itemA = fn;
      init();
      return this;
    }

    var itemB = function(fn) {
      __itemB = fn;
      init();
      return this;
    }

    var shuffle = function(b) {
      __shuffle = b;
      init();
      return this;
    }
    
    var config = function(param,val) {
      __config[param] = val;
      return this;
    }
    var reset = function() {
      init();
      return this;
    }
    var onchange = function(fn) {
      __onchange = fn;
      return this;
    }
    
    return {
      data: data,
      itemA: itemA,
      itemB: itemB,
      shuffle: shuffle,
      reset: reset,
      redraw: redraw,
      config: config,
      onchange: onchange,
    }
    
  }
  
  
  flashcards.VERSION = '0.0.1';
  
  if (global.flashcards) {
    throw new Error("flashcards has already been defined.")
  } else {
    global.flashcards = flashcards;
  }
  
})(window);