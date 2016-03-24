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

  var combo = [1];
  //create a solution variable to hold the possible placement of rooks on board
  for (var i = 0; i < (n-1);i++){
    combo.push(0)
  }
  var solution = [];

  var result;

  var checkSolution = function(matrix){
    var solutionBoard = new Board(matrix);
    var rowCheck = solutionBoard.hasAnyRowConflicts();
    var columnCheck = solutionBoard.hasAnyColConflicts();

    if(rowCheck === false && columnCheck === false){
  
      result = matrix;
    } else {

      solution = [];
      solutionMaker();
    }
  };

var solutionMaker = function(){

  if (solution.length === n) {
    
    // enter solution check here
    checkSolution(solution);

  } else {
    combo = _.shuffle(combo)
    solution.push(combo);
    solutionMaker();
  }

};

solutionMaker();

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(result));
  return result;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  console.log('n:', n)

  var expectedSolutions = [1,1,2]

  var i = 2
  while (i <= n){
    expectedSolutions.push(expectedSolutions[i] * (i+1));
    i++;
  }

  console.log('expectedSolutions:', expectedSolutions);

  console.log('Number of solutions for ' + n + ' rooks:', expectedSolutions[n]);
  return expectedSolutions[n];
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
