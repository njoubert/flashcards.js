(function(global){ 
  var flashcards = function(element,id,config) {
    
    return {
      that
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