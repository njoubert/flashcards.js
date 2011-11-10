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
  var flashcards = function(container, paneA, paneB) {
    return Flashcard(container, paneA, paneB);
  }

  var array_shuffle = function(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };


  var Flashcard = function(container, paneA, paneB) {
    var self = this;
    var __ELcontainer = document.getElementById(container);
    var __ELpaneA = document.getElementById(paneA);
    var __ELpaneB = document.getElementById(paneB);
    var __extractor = null;
    var __itemA     = null;
    var __itemB     = null;
    var __shuffle   = true;

    var __data = [];
    var __current_idx = 0;
    var __paneA_visible = false;
    var __paneB_visible = false;
    
    
    //set up event handlers:
    __ELpaneA.onclick = function() {
      console.log("clicking")
      if (__paneA_visible) {
        next();
        toggle_paneA_visibility(true);
        toggle_paneB_visibility(false);
      } else {
        toggle_paneA_visibility(true);
      }
    }

    __ELpaneB.onclick = function() {
      if (__paneB_visible) {
        next();
        toggle_paneA_visibility(false);
        toggle_paneB_visibility(true);
      } else {
        toggle_paneB_visibility(true);
      }
    }

    
    var toggle_paneA_visibility = function(state) {
      if (state) {
        __ELpaneA.innerHTML = __itemA(__data[__current_idx]);
      } else {
        __ELpaneA.innerHTML = "";
      }
      __paneA_visible = state;
    }
    var toggle_paneB_visibility = function(state) {
      if (state) {
        __ELpaneB.innerHTML = __itemB(__data[__current_idx]);
      } else {
        __ELpaneB.innerHTML = ""        
      }      
      __paneB_visible = state;
    }
    
  
    var init = function() {
      if (__extractor === null || __itemA === null || __itemB === null)
        return;
      
      if (__shuffle) {
        __data = array_shuffle(__extractor());
      } else {
        __data = __extractor();
      }
      toggle_paneA_visibility(false);
      toggle_paneB_visibility(false);
      __current_idx = 0;
      return;
    }
  
    var next = function() {
      console.log("nexting")
      if (__current_idx < __data.length-1) {
        __current_idx += 1;
      } else {
        init();
      }
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
    
    return {
      data: data,
      itemA: itemA,
      itemB: itemB,
      shuffle: shuffle
    }
    
  }
  
  
  flashcards.VERSION = '0.0.1';
  
  if (global.flashcards) {
    throw new Error("flashcards has already been defined.")
  } else {
    global.flashcards = flashcards;
  }
  
})(window);