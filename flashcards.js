/*!
 * flashcards.js Javascript Library
 * https://github.com/njoubert/flashcards.js
 *
 * Copyright 2011, Niels Joubert
 *
 */

(function(global){ 
  var flashcards = function(container, paneA, paneB) {
    return new Flashcard(container, paneA, paneB);
  }


  var shuffle = function(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };


  var Flashcard = function(container, paneA, paneB) {
    var self = this;
    this.__ELcontainer = document.getElementById(container);
    this.__ELpaneA = document.getElementById(paneA);
    this.__ELpaneB = document.getElementById(paneB);
    this.__extractor = null;
    this.__itemA     = null;
    this.__itemB     = null;
    this.__shuffle   = true;

    this.__data = [];
    this.__current_idx = 0;
    
    this.__paneA_visible = false;
    this.__paneB_visible = false;
    
    
    var toggle_paneA_visibility = function(state) {
      if (state) {
        self.__ELpaneA.innerHTML = self.__itemA(self.__data[self.__current_idx]);
      } else {
        self.__ELpaneA.innerHTML = "";
      }
      self.__paneA_visible = state;
    }
    var toggle_paneB_visibility = function(state) {
      if (state) {
        self.__ELpaneB.innerHTML = self.__itemB(self.__data[self.__current_idx]);
      } else {
        self.__ELpaneB.innerHTML = ""        
      }      
      self.__paneB_visible = state;
    }
    
    this.__ELpaneA.onclick = function() {
      if (self.__paneA_visible) {
        self.next();
        toggle_paneA_visibility(true);
        toggle_paneB_visibility(false);
      } else {
        toggle_paneA_visibility(true);
      }
    }

    this.__ELpaneB.onclick = function() {
      if (self.__paneB_visible) {
        self.next();
        toggle_paneA_visibility(false);
        toggle_paneB_visibility(true);
      } else {
        toggle_paneB_visibility(true);
      }
    }

    
  }
  
  Flashcard.prototype.init = function() {
    if (this.__extractor === null || this.__itemA === null || this.__itemB === null)
      return this;
      
    if (this.__shuffle) {
      this.__data = shuffle(this.__extractor());
    } else {
      this.__data = this.__extractor();
    }
    this.__current_idx = -1;
    this.next();
    return this;
  }
  
  Flashcard.prototype.data = function(fn) {
    this.__extractor = fn;
    return this.init();
  }
  
  Flashcard.prototype.itemA = function(fn) {
    this.__itemA = fn;
    return this.init();
  }

  Flashcard.prototype.itemB = function(fn) {
    this.__itemB = fn;
    return this.init();
  }

  Flashcard.prototype.shuffle = function(b) {
    this.__shuffle = b;
    return this.init();
  }
  
  Flashcard.prototype.next = function() {
    if (this.__current_idx < this.__data.length) {
      this.__current_idx += 1;
    } else {
      this.__current_idx = 0;
    }
    
  }  
  
  
  
  flashcards.VERSION = '0.0.1';
  
  if (global.flashcards) {
    throw new Error("flashcards has already been defined.")
  } else {
    global.flashcards = flashcards;
  }
  
})(window);