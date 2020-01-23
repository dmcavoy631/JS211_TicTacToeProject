//       ***********************
//            INSTRUCTIONS
//       ***********************

// 1. Read the code below and figure out the data flow
// 2. Add in your code from the terminal app (check for win logic)
// 3. Look for the @TODO, to fix
// next to each @TODO you will find tasks that need to be finished
// 4. GET THIS GAME WORKING!!
let winCntX = 0;    
let winCntO = 0;
let currentMarker = 'X';

let board = [
  ['','',''],
  ['','',''],
  ['','','']
];

// is called when a square is clicked. "this" = element here
const handleClick = (element) => {

  if(!document.getElementById(element.id).innerHTML){
    addMarker(element.id)
    updateBoard(element.id)
    checkForWin()
  }
}

const addMarker = (id) => {
  console.log(`We'll place a mark on square: ${id}`)
  document.getElementById(id).innerHTML = currentMarker;

}

const toggleCurrentPlayer = () =>{
  document.getElementById("player" + currentMarker).classList.toggle("yourTurn");
}

const updateBoard = (id) => {
  // parses the id string into a number then captures the first and last part the newly create number as row & column
  const row = parseInt(id.charAt(0))
  const column = parseInt(id.charAt(2)) 

  console.log(`you clicked the sq at ${row} and ${column}`)
  console.log(board)

  // @TODO, Your code here: use the above information to change the board variable(array of arrays)
  board[row][column] = currentMarker;

}

const checkForWin = () => {
  // calls each checkForWin possibility and if any are true gives a page alert,
  if(horizontalWin() || verticalWin() || diagonalWin()) {
// **BONUS** you could make the dismissal of this alert window reset the board...
    window.alert(`Player ${currentMarker} won!`)
    resetBoard()

    //Update Score and innerHTML values
    if(currentMarker == 'X'){

      winCntX++;
      document.getElementById('scoreX').innerHTML = winCntX;
      
    }
    //Update Score and innerHTML values
    if(currentMarker == 'O'){

      winCntO++;
      document.getElementById('scoreO').innerHTML = winCntO;
 

    }
  } else {
  // if no win, change the marker from X to O, or O to X for the next player.

    changeMarker()

  // window.alert(`Player ${currentMarker} Turn!`)
  }
}

const horizontalWin = () => {
  // @TODO, Your code here: to check for horizontal wins
  let HM = currentMarker 
  for (let i = 0; i < board.length; i++){
    let j = 0;
    if (board[i][j] == HM && board[i][j+1] == HM && board[i][j+2] == HM){
      console.log(board[i][j])
      return true;
    }
  }
}


const verticalWin = () => {
  // @TODO, Your code here: to check for vertical wins
  let VM = currentMarker 
  for (let j = 0; j < board.length; j++){
    let i = 0;
    if (board[i][j] == VM && board[i+1][j] == VM && board[i+2][j] == VM){
      console.log(board[i][j])
      return true;
    }
  }
}

const diagonalWin = () => {
  // @TODO, Your code here: to check for diagonal wins
  let XM = currentMarker;
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


const changeMarker = () => {
  // ternary operator: if it's an X make it an O, if O make it an X
  toggleCurrentPlayer();
  currentMarker = currentMarker === "X" ? "O" : "X";
  toggleCurrentPlayer();
}

const resetScore = () =>{
    // Clearing ScoreBoard
    winCntX = 0;    
    winCntO = 0;
    document.getElementById('scoreX').innerHTML = winCntX
    document.getElementById('scoreO').innerHTML = winCntO
    document.getElementById("playerO").classList.remove("yourTurn");
    document.getElementById("playerX").classList.remove("yourTurn");
}


const resetBoard = () => {
  // sanity check: this tells us the function is being called
  console.log("the board was cleared!")
  toggleCurrentPlayer();

  // collects all of the "td"s into an HTML Collection: https://www.w3schools.com/jsref/dom_obj_htmlcollection.asp  
  const squares = document.getElementsByTagName("TD")
  board = [
    ['','',''],
    ['','',''],
    ['','','']
  ];
  // loops over the HTML Collections and clears out the Xs and Os
  for (i=0; i<squares.length; i++) {
    console.log(squares[i])
    squares[i].innerHTML = null
  }
  
  // @TODO, Your code here: make sure to reset the array of arrays to empty for a new game
}

// **BONUSES**

// 1. Display the current player's turn
// 2. Count number of wins for each player and display them <- DONE
// 3. Reset the number of wins <- DONE
// 4. Clear the board on alert window dismissal
// 5. Add players names and display who wins, i.e. "Congrats Emily, you won with 0s!"

