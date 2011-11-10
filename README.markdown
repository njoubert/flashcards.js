# flashcards.js

A flexible javascript library for creating flashcards

## Design

flashcards.js generates something that looks like this gorgeous ASCII drawing:

    /---------------\
    |    item A     |   <-- touch this to get a new flashcard
    \---------------/
    /---------------\
    |    item B     |   <-- touch this to get a new flashcard
    \---------------/

### What does it do?

flashcards.js should generate a 2-pane layout, where interacting with a pane displays a specific item from a randomly selected tuple, and interactin

flashcards.js will internally handle user interaction events and data management. control over the data, on the other hand, is left to the user. Thus, flashcards.js will have the following features:

* Work with arbitrary data
* Internally handle user clicks
* Expose events when user interacts with flashcards, reporting:
    * Currently displayed tuple
    * Tuples left in current cycle
* Create no structural DOM elements
    * Thus it will require three DOM elements to be present: a wrapper, and two panes.
    * It will only change the innerHTML of these elements.
* Allow for easy external control
    * We easily reset all internal state

### Where does the data come from?

flashcards.js is content agnostic. It interacts with data through a set of extractor functions working on tuples (where the reified type of a tuple remains unstated). A tuple contains, at the very least, the data for a single flashcard consisting of two items:

* .data(function() { return <array of tuples> })
* .itemA(function(tuple) { return <unicode string> }) - this string will be displayed in pane A
* .itemB(function(tuple) { return <unicode string> }) - this string will be displayed in pane B
* .shuffle(<boolean>) - shuffle the tuple array before flashcarding?

*State:*  changing any of these functions will regenerate all internal state. This makes it easy to build a control panel that interacts with this data.

## example:

    <html>
    <head>
        <script>
            var f1 = flashcards($("flashcard1"))
                .data(function() { return [(1,"one"),(2,"two"),(3,"three")]; })
                .itemA(function(t) { return t[0]; })
                .itemB(function(t) { return t[1]; })
                
        </script>
    </head>
    <body>
        <div id="flashcard1">
            <div id="flashcard1_paneA"></div>
            <div id="flashcard1_paneB"></div>
        </div>
    </body>
    </html>
        
        
        
        