// ------------------------
// CONFIGURATION
// ------------------------

var Config = {
  outerMargin: 48,
  innerMargin: 4,
  backColor: "rgb(64,208,192)",
  squareColor: "rgb(255,255,255)",
  penColor: "rgb(48,48,48)",
  penHoverColor: "rgb(208,208,208)",
  penWinColor: "rgba(255,48,48,0.6)",
  penWidth: 8,
  penWinWidth: 12,
};



// ------------------------
// GLOBAL VARS
// ------------------------

var cvs, // canvas html
    ctx, // canvas context
    pageW, // window width
    pageH, // window height
    boardSize, // board width/height
    boardL,
    boardT,
    sqSize, // square size
    sqOffset,
    squares, // board status
    playerTurn, // 1 -> AI; 0 -> Player
    playerFirst = 0, // First player to play
    mousedIndex, // pos of the mouse in the board
    gameStatus; // winner and empty squares (winner = -1 on draw)



// ------------------------
// SETUP / INITIALIZATION
// ------------------------

// Called at the restart of a game
function Init(){
  var i;
  
  squares = [];
  for(i = 0; i < 9; i++){
    squares[i] = null;
  }
  
  gameStatus = { winner: null }; 
  playerTurn = 1 - playerFirst;
  playerFirst = 1 - playerFirst;
  mousedIndex = -1;

  ChangeTurn();
}



// ------------------------
// CORE FUNCTIONS
// ------------------------

// Place Piece on the board
function AddMove(index,player){
  squares[index] = player;
  gameStatus = GetOutcomes(squares);
  ChangeTurn();
}

// Change player turn
function ChangeTurn(){
  if (gameStatus.winner === null){
    playerTurn = 1 - playerTurn;
    if (playerTurn === 1){      
      AIMove(squares,playerTurn);
    }
  }
  mousedIndex = -1;
  Draw();
}


// Checks if there are any possible movement
function FindMoves(board){
  var moves = [],
      i;
  
  for(i = 0; i < 9; i++){
    if (board[i] === null){
      moves.push(i);
    }
  }  
  return (moves.length > 0)? moves : null;
}



// Check winners
function GetOutcomes(board){
  var i,
      openSquares;
  
  // check for win condition along horizontal and vertical rows
  for(i = 0; i < 3; i++){
    if (board[CoordsToIndex(i,0)] !== null && 
        board[CoordsToIndex(i,0)] === board[CoordsToIndex(i,1)] &&
        board[CoordsToIndex(i,0)] === board[CoordsToIndex(i,2)]){
      return {
        winner: board[CoordsToIndex(i,0)], 
        squares: [ {x:i,y:0}, {x:i,y:1}, {x:i,y:2} ]
      };
    }
    if (board[CoordsToIndex(0,i)] !== null && 
        board[CoordsToIndex(0,i)] === board[CoordsToIndex(1,i)] &&
        board[CoordsToIndex(0,i)] === board[CoordsToIndex(2,i)]){
      return {
        winner: board[CoordsToIndex(0,i)], 
        squares: [ {x:0,y:i}, {x:1,y:i}, {x:2,y:i} ]
      };
    }
  }
  
  // check for win condition along diagonals
  if (board[CoordsToIndex(0,0)] !== null &&
      board[CoordsToIndex(0,0)] === board[CoordsToIndex(1,1)] &&
      board[CoordsToIndex(0,0)] === board[CoordsToIndex(2,2)]){
    return {
      winner: board[CoordsToIndex(0,0)], 
      squares: [ {x:0,y:0}, {x:1,y:1}, {x:2,y:2} ]
    };
  }
  if (board[CoordsToIndex(0,2)] !== null &&
      board[CoordsToIndex(0,2)] === board[CoordsToIndex(1,1)] &&
      board[CoordsToIndex(0,2)] === board[CoordsToIndex(2,0)]){
    return {
      winner: board[CoordsToIndex(0,2)], 
      squares: [ {x:0,y:2}, {x:1,y:1}, {x:2,y:0} ]
    };
  }
  
  // if no winner found, check for tie
  openSquares = FindMoves(board);
  
  // if moves found, game is not tied
  if (openSquares){
    return {
      winner: null,
      squares: openSquares
    };
  }
  else{
    return { 
      winner: -1,
      squares: null
    };
  }
}


// ------------------------
// HELPER FUNCTIONS
// ------------------------

function PointInRect(pX, pY, rL, rT, rW, rH){
  return (pX>rL && pX<rL+rW && pY>rT && pY<rT+rW);
}


function CoordsToIndex(x,y){
  return x + 3*y;
}

function CheckMousePos(mX, mY, click){
  var left,
      top,
      index = -1,
      i,
      j;

  
  for(i = 0; i < 3; i++){
    for(j = 0; j < 3; j++){
      left = boardL + i*sqOffset;
      top = boardT + j*sqOffset;     
      if (squares[CoordsToIndex(i,j)] === null && 
          PointInRect(mX, mY, left, top, sqSize, sqSize)){        
        index = CoordsToIndex(i,j);
      }
    }
  }
  
  cvs.style.cursor = (index > -1)? 'pointer' : 'default';
  if (mousedIndex !== index){
    mousedIndex = index;
    Draw();
  }
  
  if (click && squares[index]===null){
    AddMove(index, playerTurn);
  }  
}