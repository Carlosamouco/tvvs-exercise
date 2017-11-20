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
// DRAW FUNCTIONS
// ------------------------

function Draw(){
  var left,
      top,
      isHover,
      i,
      j,
      index;
  
  ctx.fillStyle = Config.backColor;
  ctx.fillRect(0, 0, pageW, pageH);  
  
  for(i = 0; i < 3; i++){
    for(j = 0; j < 3; j++){
      left = boardL + i*sqOffset;
      top = boardT + j*sqOffset;
      index = CoordsToIndex(i,j);
      isHover = (index === mousedIndex);      
      
      DrawSquare(squares[index], left, top, sqSize, isHover);
    }
  }
  
  if (gameStatus.winner === 0 || gameStatus.winner === 1){ DrawWinnerLine(); }
}


function DrawSquare(player, left, top, size, isMoused){
  ctx.fillStyle = Config.squareColor;
  ctx.fillRect(left, top, sqSize, sqSize);
  
  if (player === 0 || (playerTurn === 0 && isMoused)){
    DrawX(left, top, size);
  }
  else if (player === 1 || (playerTurn === 1 && isMoused)){
    DrawO(left, top, size);
  }
  else {
    return;
  }
  ctx.lineWidth = (sqSize/100) * Config.penWidth;
  ctx.strokeStyle = (isMoused && player===null)? Config.penHoverColor : Config.penColor;
  ctx.stroke();
}


function DrawX(left, top, size){
  var x1 = left + 0.2*size,
      x2 = left + 0.8*size,
      y1 = top + 0.2*size,
      y2 = top + 0.8*size;
  
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.moveTo(x1, y2);
  ctx.lineTo(x2, y1);
}


function DrawO(left, top, size){
  var x = left + 0.5*size,
      y = top + 0.5*size,
      rad = 0.3*size;
  
  ctx.beginPath();
  ctx.arc(x, y, rad, 0, 2*Math.PI, false);
}


function DrawWinnerLine(){
  var x1 = boardL + gameStatus.squares[0].x*sqOffset + 0.5*sqSize,      
      x2 = boardL + gameStatus.squares[2].x*sqOffset + 0.5*sqSize,      
      y1 = boardT + gameStatus.squares[0].y*sqOffset + 0.5*sqSize,
      y2 = boardT + gameStatus.squares[2].y*sqOffset + 0.5*sqSize,
      xMod = 0.2*(x2-x1),
      yMod = 0.2*(y2-y1);
  
  x1 -= xMod;
  x2 += xMod;
  
  y1 -= yMod;
  y2 += yMod;
  
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  
  ctx.lineWidth = (sqSize/100) * Config.penWinWidth;
  ctx.strokeStyle = Config.penWinColor;
  ctx.stroke();
}