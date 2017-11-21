// ------------------------
// EVENT HANDLERS/LISTENERS
// ------------------------

function OnLoad(){
    CreateCanvas();
    SetCanvasSize();
    Init();
  }
  
  function OnResize(){
    SetCanvasSize();
    Drawer.Draw(board);
  }
  
  function OnMouseMove(e){
    if ((board.playerTurn === PLAYER || board.playerTurn === CPU) && board.gameStatus.winner == null){
      CheckMousePos(e.clientX, e.clientY);
    }
  }
  
  function OnMouseDown(e){
    if (board.gameStatus.winner !== null){
      Init();
    }
    else if (board.playerTurn === PLAYER || board.playerTurn === CPU){
      CheckMousePos(e.clientX, e.clientY, true);
    }
  }
  
  function OnKeyDown(e){
    var key = event.keyCode || event.which;
    switch (key){
      case 27:
      case 82: Init(); break;
      default: break;
    }
  }
  
  
  window.addEventListener('load',OnLoad,false);
  window.addEventListener('resize',OnResize,false);
  window.addEventListener('mousemove',OnMouseMove,false);
  window.addEventListener('mousedown',OnMouseDown,false);
  window.addEventListener('keydown',OnKeyDown,false);