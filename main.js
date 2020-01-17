'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// creates and empty "board" for the user to see where marks can be placed.
// using let because the variable is expected to change with more 'X's and 'O's to add
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

// assigns the first mark as 'X'
// using let because the variable is expected to change from 'X' to 'O' and back
let playerTurn = 'X';

// is a function that print the current status of the board using the variable - board
const printBoard = () => {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

const horizontalWin = () => {
  // Your code here to check for horizontal wins
  let HM = playerTurn;
  for (let i = 0; i < board.length; i++){
    let j = 0;
    if (board[i][j] == HM && board[i][j+1] == HM && board[i][j+2] == HM){
      return true;
    }
  }
}

const verticalWin = () => {
  // Your code here to check for vertical wins
  let VM = playerTurn;
  for (let j = 0; j < board.length; j++){
    let i = 0;
    if (board[i][j] == VM && board[i+1][j] == VM && board[i+2][j] == VM){
      return true;
    }
  }
}

const diagonalWin = () => {
  // Your code here to check for diagonal wins
  let XM = playerTurn;
  let i = 0;
  let j = 0;

  if (board[i][j] == XM && board[i+1][j+1] == XM && board[i+2][j+2] == XM){
    console.log(board[i][j])
    return true;
  } else if (board[i][j+2] == XM && board[i+1][j+1] == XM && board[i+2][j] == XM){
    console.log(board[i][j])
    return true;
  }
}


const checkForWin = () => {
  // Your code here call each of the check for types of wins
  if(horizontalWin() || verticalWin() || diagonalWin()) {
    return true;
  } else {
    return false;
  }
}

const ticTacToe = (row, column) => {
  // Your code here to place a marker on the board

  board[row][column] = playerTurn;
  
  // then check for a win
  checkForWin()

  // Change player
  changePlayer()
}

// If X make it O
const changePlayer = () =>{
  playerTurn = playerTurn === "X" ? "O" : "X";
}

const getPrompt = () => {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });
}


// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepStrictEqual(board, [ [' ',' ',' '], [' ','X',' '], [' ',' ',' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepStrictEqual(board, [ ['O',' ',' '], [' ','X',' '], [' ',' ',' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}