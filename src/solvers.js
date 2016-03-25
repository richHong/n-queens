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

  //console.log('n:', n)

  var expectedSolutions = [1,1,2]

  var i = 2
  while (i <= n){
    expectedSolutions.push(expectedSolutions[i] * (i+1));
    i++;
  }

  //console.log('expectedSolutions:', expectedSolutions);

  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return expectedSolutions[n];
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  console.log('n:',n)

  if (n === 0){
    return [];
  } else if (n === 1){
    return [[1]];
  } 

  var pieces = []

  for (var i = 0; i < n; i++){
    pieces.push(1);
  }
  for (var j =0; j < ((n*n)-n);j++){
    pieces.push(0);
  }


  var combo = [];

  var solution = [];

  var result;

var solutionMaker = function(){
  pieces = _.shuffle(pieces);
  console.log('pieces', pieces)
  for (var i = 0; i < pieces.length;i++){
    if (combo.length === n){
      console.log('combo', combo)
      solution.push(combo);
      combo = [];
    } 
    //console.log('piece at '+pieces[i]+' index '+i)
    combo.push(pieces[i]);
  }
  console.log('combo',combo)
  solution.push(combo);
  checkSolution();
};
 
var checkSolution = function(){
    var solutionBoard = new Board(solution);
    var check = solutionBoard.hasAnyColConflicts();
    var check2 = solutionBoard.hasAnyRowConflicts();
    var check3 = solutionBoard.hasAnyMajorDiagonalConflicts();
    var check4 = solutionBoard.hasAnyMinorDiagonalConflicts();
    //console.log('pieces check', pieces)
    console.log('solution:', solution);
    console.log('check:',check, check2, check3, check4);
    if((check === false) && (check2 === false) && (check3 === false) && (check4 === false)){
      result = solution;
    } else {
      combo = [];
      solution = [];
      solutionMaker();
    }
};

solutionMaker();


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(result));
  return result;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
