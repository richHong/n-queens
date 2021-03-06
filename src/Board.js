// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
       var counter = 0;
      //iterate through row
      //if more than '1' '1' in row, then return true else return false
      _.each(this.attributes[rowIndex], function(val) {
        if (val === 1) {
          counter++;
        }
      });
      if (counter > 1) {
        return true;
      } else {
        return false; // fixme
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this;
      return _.some(board.attributes, function(row,rowIndex) {
        return board.hasRowConflictAt(rowIndex);
      });
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var column = [];
      _.each(this.attributes, function(row, rowIndex) {
        if(row[colIndex] !== undefined){
          column.push(row[colIndex]);
        }
      });

      var counter = 0;

      _.each(column, function(val) {
        if (val === 1) {
          counter++;
        }
      });

      if (counter > 1) {
        return true;
      } else {
        return false; // fixme
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
       var board = this;
      return _.some(board.attributes, function(col,colIndex) {
        return board.hasColConflictAt(colIndex);
      });
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      
      var mjDiagonal = [];
      var start;
      var mjCounter;
     
      if(majorDiagonalColumnIndexAtFirstRow > -1){
        start = 0;
        mjCounter = majorDiagonalColumnIndexAtFirstRow;
        _.each(this.attributes, function(row, rowIndex) {
          if (row[start + mjCounter] !== undefined){
            mjDiagonal.push(row[start + mjCounter]);
            mjCounter++;
          }
        });
      } else {
        start = -majorDiagonalColumnIndexAtFirstRow;
        mjCounter = 0;
        while (start < Object.keys(this.attributes).length - 1){
          if (this.attributes[start][mjCounter] !== undefined){
            mjDiagonal.push(this.attributes[start][mjCounter]);
          }
          start++;
          mjCounter++;
        }
     }

      var counter = 0;
      _.each(mjDiagonal, function(val) {
        if (val === 1) {
          counter++;
        }
      });
      if (counter > 1) {
        return true;
      } else {
        return false; // fixme
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var x = Object.keys(this.attributes).length -1;
      //create a counter as starting point
      var counter = -(x-1);
      //create variable to hold false 
      var state = false;
      //create condition to run function using a while loop
      while (counter < x) {
        //call in helper function on counter
        if (this.hasMajorDiagonalConflictAt(counter)){
          state = true;
        }
        counter++;
      }
      return state;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var mnDiagonal = [];
      //create a variable to reference the start, but doesn't change 
      var startHolder;
      //create variable to start
      var start;
      //create a variable get right index 
      var mnCounter;
      startHolder = Object.keys(this.attributes).length - 2;

      //create conditions to set our start and mnCounter variables
      if (minorDiagonalColumnIndexAtFirstRow < startHolder) {
        start = 0;
        mnCounter = minorDiagonalColumnIndexAtFirstRow;
      } else {
        mnCounter = startHolder;
        start = minorDiagonalColumnIndexAtFirstRow - mnCounter;
      }
     
      while (start < startHolder + 1) {
        if (this.attributes[start][mnCounter] !== undefined) {
          mnDiagonal.push(this.attributes[start][mnCounter]);
        }
          start++;
          mnCounter--;
      }

      var counter = 0;
      _.each(mnDiagonal, function(val) {
        if (val === 1) {
          counter++;
        }
      });
      if (counter > 1) {
        return true;
      } else {
        return false; // fixme
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var x = (Object.keys(this.attributes).length -2) * 2;
      //create a counter as starting point
      var counter = 0;
      //create variable to hold false 
      var state = false;
      //create condition to run function using a while loop
      while (counter < x) {
        //call in helper function on counter
        if (this.hasMinorDiagonalConflictAt(counter)){
          state = true;
        }
        counter++;
      }
      return state;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
