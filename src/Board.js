// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
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
      var matrixRow = this.rows()[rowIndex];
      var resultArray = [];
      matrixRow.forEach(function(rowVal, idx) {
        if (rowVal === 1) {
          resultArray.push(rowVal);
        }
      });
      return resultArray.length > 1 ? true : false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var conflict = false;
      var matrix = this.rows();
      matrix.forEach(function(row, idx) {
        var rowOccupied = false;
        row.forEach(function(val, index) {
          if (val === 1 && !rowOccupied) {
            rowOccupied = true;
          } else if (val === 1 && rowOccupied) {
            conflict = true;
          }
        });

      });
      return conflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      result = []; 
      // console.log('index',colIndex);
      //get access to the board array of array
      var board = this.rows();
      //iterate through the rows
      // board.forEach(function(row) {

      //   // console.log('FOOOOOOO', row[colIndex]);
      //   // // if row's val at box-colIndex is 1
      //   // if (row[colIndex] === 1) {
      //   //   //add to the result array
      //   //   result.push(1);
      //   // }
      //   row.forEach(function(value, j) {
      //     if (row[colindex][j] === 1) {
      //       result.push(1);
      //     }
      //   });

      // }); 
      // //if the result array is longer than 1
      // return result.length > 1 ? true : false;
      
      //return true
      //otherwise
      //return false
      var columnOccupied = false;
      for (var i = 0; i < board.length; i++) {
        var row = board[i];
        console.log('row', row);
        console.log('colIndex', colIndex);
        console.log('row[col]', row[colIndex]);
        if (row[colIndex] === 1 && !columnOccupied) {
          columnOccupied = true;
        } else if (row[colIndex] === 1 && columnOccupied) {
          return true;
        }
      }

      return false;




    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //make a result array
      var result = [];
      //make a matrix array
      var board = this.rows();
      //iterate through the array
      for (var i = 0; i < board.length; i++) { //in the first iteration y is 0
        if (this.hasColConflictAt(i)) {
          return true;
        }
        // var array = [];
        // for (var x = 0; x < board[y].length; x++) {
        //   if (board[y][x] === 1) {
        //     array.push(1);
        //   }
        //   if (array.length > 1) {
        //     return true;
        //   }
        // }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var limit = board.length-1;

      // we are given a row-index in the first row
      // position is board[0][input]

      //if the given position has a value of one b[x][y]
      if (board[0][majorDiagonalColumnIndexAtFirstRow] === 1) {
        //recursive function
        var conflictSearch = function (row, column) {
          //add one to x and y
          var row = row++;
          var column = column++;
          //if x or y don't exceed board.length -1
          if (row > limit || column > limit) {
            //stop recursing
          } else {
            //if b[x][y] is one
              
              //return true
            //recurse
          }
        };
        //call the recursive function
        conflictSearch(0, majorDiagonalColumnIndexAtFirstRow);
      }
      //return false



      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
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
