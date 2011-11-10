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
    this.__ELcontainer = document.getElementById(container);
    this.__ELpaneA = document.getElementById(paneA);
    this.__ELpaneB = document.getElementById(paneB);
    this.__extractor = null;
    this.__itemA     = null;
    this.__itemB     = null;
    this.__shuffle   = true;
    
    
    

  }
  
  Flashcard.prototype.init = function() {
    if (this.__extractor === null || this.__itemA === null || this.__itemB === null)
      return this;
      
      
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
  
  
  
  flashcards.VERSION = '0.0.1';
  
  if (global.flashcards) {
    throw new Error("flashcards has already been defined.")
  } else {
    global.flashcards = flashcards;
  }
  
})(window);