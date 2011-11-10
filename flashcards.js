/*!
 * flashcards.js Javascript Library
 * https://github.com/njoubert/flashcards.js
 *
 * Copyright 2011, Niels Joubert
 *
 */

(function(global){ 
  var flashcards = function(element) {
    return new Flashcard(element);
  }

  var Flashcard = function(element) {
    rootel = element;
    extractor = null;
    itemA     = null;
    itemB     = null;
    shuffle   = true;
    this.init();
  }
  
  Flashcard.prototype.init = function() {
    if (extractor === null || itemA === null || itemB === null)
      return this;
      
    console.log("Initializing flashcards on " + rootel.getAttribute("id"))

    return this;
  }
  
  Flashcard.prototype.data = function(fn) {
    extractor = fn;
    this.init();
    return this;
  }
  
  Flashcard.prototype.itemA = function(fn) {
    itemA = fn;
    return this.init();
  }

  Flashcard.prototype.itemB = function(fn) {
    itemB = fn;
    return this.init();
  }

  Flashcard.prototype.shuffle = function(b) {
    shuffle = b;
    return this.init();
  }
  
  
  
  flashcards.VERSION = '0.0.1';
  
  if (global.flashcards) {
    throw new Error("flashcards has already been defined.")
  } else {
    global.flashcards = flashcards;
  }
  
})(window);