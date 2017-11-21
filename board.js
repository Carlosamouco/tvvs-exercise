'use strict';

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
    mousedIndex;

// ------------------------
// BOARD FUNCTIONS
// ------------------------
class Board {  
  constructor(firstPlayer, gameMode) {
    this.squares; // board status
    this.playerTurn; // 1 -> AI; 0 -> Player
    this.playerFirst = firstPlayer; // First player to play
    this.gameMode = gameMode;
    this.gameStatus; // winner and empty squares (winner = -1 on draw)
  }
    
  resetBoard() {    
    this.squares = [];
    for(let i = 0; i < 9; i++){
      this.squares[i] = null;
    }
    
    this.gameStatus = { winner: null }; 
    this.playerTurn = this.playerFirst;
    this.playerFirst = 1 - this.playerFirst;
    mousedIndex = -1;
  }

  changeTurn() {
    if (this.gameStatus.winner === null) {
      this.playerTurn = 1 - this.playerTurn;      
    }
    mousedIndex = -1;
  }

  aiTurn() {
    const bestMove = AI.AIMove(this.squares, this.playerTurn);
    this.addMove(bestMove);
  }

  addMove(index){
    this.squares[index] = this.playerTurn;
    this.gameStatus = Board.getOutcomes(this.squares);
  }

  static findMoves(board){
    var moves = [];
    
    for(let i = 0; i < 9; i++){
      if (board[i] === null){
        moves.push(i);
      }
    }  
    return (moves.length > 0)? moves : null;
  }

  // Check game state
  static getOutcomes(squares){
    var i, openSquares;
    
    // check for win condition along horizontal and vertical rows
    for(i = 0; i < 3; i++){
      if (squares[CoordsToIndex(i,0)] !== null && 
      squares[CoordsToIndex(i,0)] === squares[CoordsToIndex(i,1)] &&
      squares[CoordsToIndex(i,0)] === squares[CoordsToIndex(i,2)]){
        return {
          winner: squares[CoordsToIndex(i,0)], 
          squares: [ {x:i,y:0}, {x:i,y:1}, {x:i,y:2} ]
        };
      }
      if (squares[CoordsToIndex(0,i)] !== null && 
          squares[CoordsToIndex(0,i)] === squares[CoordsToIndex(1,i)] &&
          squares[CoordsToIndex(0,i)] === squares[CoordsToIndex(2,i)]){
        return {
          winner: squares[CoordsToIndex(0,i)], 
          squares: [ {x:0,y:i}, {x:1,y:i}, {x:2,y:i} ]
        };
      }
    }
    
    // check for win condition along diagonals
    if (squares[CoordsToIndex(0,0)] !== null &&
        squares[CoordsToIndex(0,0)] === squares[CoordsToIndex(1,1)] &&
        squares[CoordsToIndex(0,0)] === squares[CoordsToIndex(2,2)]){
      return {
        winner: squares[CoordsToIndex(0,0)], 
        squares: [ {x:0,y:0}, {x:1,y:1}, {x:2,y:2} ]
      };
    }
    if (squares[CoordsToIndex(0,2)] !== null &&
        squares[CoordsToIndex(0,2)] === squares[CoordsToIndex(1,1)] &&
        squares[CoordsToIndex(0,2)] === squares[CoordsToIndex(2,0)]){
      return {
        winner: squares[CoordsToIndex(0,2)], 
        squares: [ {x:0,y:2}, {x:1,y:1}, {x:2,y:0} ]
      };
    }
    
    // if no winner found, check for tie
    openSquares = Board.findMoves(squares);
    
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
}

// ------------------------
// AI FUNCTIONS
// ------------------------

class AI {
  static AIMove(board, player){
    var outcomes = Board.getOutcomes(board),
        bestMove,
        bestAlphaBeta = -2,
        testAlphaBeta,
        testBoard;
  
    for(let i = 0; i < outcomes.squares.length; i++){      
      testBoard = board.slice(0);
      testBoard[outcomes.squares[i]] = player;
      testAlphaBeta = this.AlphaBeta(testBoard, -999, 999, player, false);
  
      if (testAlphaBeta > bestAlphaBeta){
        bestMove = outcomes.squares[i];
        bestAlphaBeta = testAlphaBeta;
      }
    }
  
    return bestMove;
  };
  
  static AlphaBeta(board, a, b, player, maximizingPlayer) {
    var i,
        outcome = Board.getOutcomes(board),
        childBoard;
  
    if (outcome.winner !== null){
      if (outcome.winner === player){ return 1; }
      else if (outcome.winner === 1-player){ return -1; }
      else{ return 0; }
    }
  
    if (maximizingPlayer){
      for(i = 0; i < outcome.squares.length; i++){
        childBoard = board.slice(0);
        childBoard[outcome.squares[i]] = player;
        a = Math.max(a, this.AlphaBeta(childBoard, a, b, player, false));
        if(b <= a){
          break; //b cut off
        }
      }
      return a;   
    }
    else{
      for(i = 0; i < outcome.squares.length; i++){
        childBoard = board.slice(0);
        childBoard[outcome.squares[i]] = 1-player;
        b = Math.min(b, this.AlphaBeta(childBoard, a, b, player, true));
        if (b <= a){
          break; //a cut off
        }
      }
      return b;
    }
  };
}

function CoordsToIndex(x,y){
  return x + 3*y;
}

if(typeof module !== 'undefined'){
  module.exports = Board;
}