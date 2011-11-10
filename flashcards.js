/*!
 * flashcards.js Javascript Library
 * https://github.com/njoubert/flashcards.js
 *
 * Copyright 2011, Niels Joubert
 *
 */

(function(global){ 
  var flashcards = function(element) {
    
    return {
      next_card: function() {
        
      }      
    }
    
  }
  
  flashcards.VERSION = '0.0.1';
  
  if (global.flashcards) {
    throw new Error("flashcards has already been defined.")
  } else {
    global.flashcards = flashcards;
  }
  
})(window);