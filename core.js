'use strict';

const CPU = 1;
const PLAYER = 0;
const SINGLE_PLAYER = 0;
const MULTI_PLAYER = 1;


let board = new Board(PLAYER, SINGLE_PLAYER);

// ------------------------
// SETUP / INITIALIZATION
// ------------------------

// Called at the restart of a game
function Init() {  
  board.resetBoard();  
  if(board.gameMode === SINGLE_PLAYER && board.playerTurn === CPU) {
    board.aiTurn();
    board.changeTurn(); 
  }  
  Drawer.Draw(board);
}

// ------------------------
// SETUP / INITIALIZATION
// ------------------------

function CreateCanvas(){
  var body = document.getElementsByTagName('body')[0];
  
  cvs = document.createElement('canvas');
  cvs.style.position = 'absolute';
  cvs.style.top = cvs.style.left = cvs.style.bottom = cvs.style.right = 0;
  
  ctx = cvs.getContext('2d');
  body.appendChild(cvs);  
}


function SetCanvasSize(){
  pageW = cvs.width = window.innerWidth;
  pageH = cvs.height = window.innerHeight;
  
  boardSize = Math.min(pageW, pageH) - 2*Config.outerMargin;
  sqSize = Math.floor((boardSize - 2*Config.innerMargin)/3);
  sqOffset = sqSize+Config.innerMargin;
  
  boardSize = 3*sqSize + 2*Config.innerMargin;
  boardL = Math.floor(pageW/2 - boardSize/2);
  boardT = Math.floor(pageH/2 - boardSize/2);
}

// ------------------------
// HELPER FUNCTIONS
// ------------------------

function PointInRect(pX, pY, rL, rT, rW, rH){
  return (pX>rL && pX<rL+rW && pY>rT && pY<rT+rW);
}


function CheckMousePos(mX, mY, click) {
  var left,
      top,
      index = -1,
      i,
      j;

  
  for(i = 0; i < 3; i++){
    for(j = 0; j < 3; j++){
      left = boardL + i*sqOffset;
      top = boardT + j*sqOffset;     
      if (board.squares[CoordsToIndex(i,j)] === null && 
          PointInRect(mX, mY, left, top, sqSize, sqSize)){        
        index = CoordsToIndex(i,j);
      }
    }
  }
  
  cvs.style.cursor = (index > -1)? 'pointer' : 'default';
  if (mousedIndex !== index){
    mousedIndex = index;
    Drawer.Draw(board);
  }
  
  if (click && board.squares[index]===null){
    board.addMove(index);
    board.changeTurn(); 
    if(board.gameMode === SINGLE_PLAYER && board.gameStatus.winner === null) {
      board.aiTurn();
      board.changeTurn(); 
    }    
    Drawer.Draw(board);
  }  
}
