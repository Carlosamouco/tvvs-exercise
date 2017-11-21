
// ------------------------
// DRAW FUNCTIONS
// ------------------------

class Drawer {
    static Draw(board) {
      var left,
          top,
          isHover,
          index;
      
      ctx.fillStyle = Config.backColor;
      ctx.fillRect(0, 0, pageW, pageH);  
      
      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          left = boardL + i*sqOffset;
          top = boardT + j*sqOffset;
          index = CoordsToIndex(i,j);
          isHover = (index === mousedIndex);      
          
          Drawer._drawSquare(board.squares[index], left, top, sqSize, isHover);
        }
      }
      
      if (board.gameStatus.winner === 0 || board.gameStatus.winner === 1){ Drawer._drawWinnerLine(board); }
    }
  
    static _drawSquare(player, left, top, size, isMoused){
      ctx.fillStyle = Config.squareColor;
      ctx.fillRect(left, top, sqSize, sqSize);
      
      if (player === 0 || (board.playerTurn === 0 && isMoused)){
        Drawer._drawX(left, top, size);
      }
      else if (player === 1 || (board.playerTurn === 1 && isMoused)){
        Drawer._drawO(left, top, size);
      }
      else {
        return;
      }
      ctx.lineWidth = (sqSize/100) * Config.penWidth;
      ctx.strokeStyle = (isMoused && player===null)? Config.penHoverColor : Config.penColor;
      ctx.stroke();
    }
  
    static _drawX(left, top, size){
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
  
    static _drawO(left, top, size){
      var x = left + 0.5*size,
          y = top + 0.5*size,
          rad = 0.3*size;
      
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, 2*Math.PI, false);
    }
  
    static _drawWinnerLine(board){
      var x1 = boardL + board.gameStatus.squares[0].x * sqOffset + 0.5 * sqSize,      
          x2 = boardL + board.gameStatus.squares[2].x * sqOffset + 0.5 * sqSize,      
          y1 = boardT + board.gameStatus.squares[0].y * sqOffset + 0.5 * sqSize,
          y2 = boardT + board.gameStatus.squares[2].y * sqOffset + 0.5 * sqSize,
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
  }
  
  function CoordsToIndex(x,y){
    return x + 3*y;
  }
  
  if(typeof module !== 'undefined'){
    module.exports = Board;
  }