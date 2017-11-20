// ------------------------
// AI FUNCTIONS/OBJECTS
// ------------------------

function AIMove(board, player){
    var outcomes = GetOutcomes(board),
        bestMove,
        bestAlphaBeta = -2,
        testAlphaBeta,
        testBoard,
        i;
  
    for(i = 0; i < outcomes.squares.length; i++){      
      testBoard = board.slice(0);
      testBoard[outcomes.squares[i]] = player;
      testAlphaBeta = AlphaBeta(testBoard, -999, 999, player, false);
  
      if (testAlphaBeta > bestAlphaBeta){
        bestMove = outcomes.squares[i];
        bestAlphaBeta = testAlphaBeta;
      }
    }
  
    AddMove(bestMove,player);
  };
  
  function AlphaBeta(board, a, b, player, maximizingPlayer){
    var i,
        outcome = GetOutcomes(board),
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
        a = Math.max(a, AlphaBeta(childBoard, a, b, player, false));
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
        b = Math.min(b, AlphaBeta(childBoard, a, b, player, true));
        if (b <= a){
          break; //a cut off
        }
      }
      return b;
    }
  };