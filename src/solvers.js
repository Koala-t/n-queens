/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n}); // fix the board
  // n is the size of the board
  // return one matrix (board) filled with n rooks which can't attack each-other
  //start with the most naieve solution

  //iterate through the rows
  for (var row = 0; row < n; row++) {
    // iterate through the current row
    for (var column = 0; column < n; column++) {

      // toggle a rook into the current cell
      board.togglePiece(row, column);
      // if invocation if hasAnyRooksConflicts returns true
      if (board.hasAnyRooksConflicts()) {
        //untoggle the rook
        board.togglePiece(row, column);
        
      }
    }
  }
  // move a reference to the finished board to solution
  



  var solution = board.rows(); //fixme //undefined

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  // n is the size of the board
  // return the number of different rook placements which can be made on that board



  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
