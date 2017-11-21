var assert = require('assert');
var http = require('http');
var postData = require('./practitest.js');
let Board = require('./../Board.js');


const PLAYER = 0;
const CPU = 1;
const DRAW = -1;
const SINGLE_PLAYER = 0;
const MULTI_PLAYER = 1;


function commitTests(tests) {
  for(let i in tests) {
    postData({
      "data": { 
        "attributes": { 
            "instance-id" : i, 
            "exit-code" : tests[i]
        } 
      }
    })
  }
}

describe('Be able to start a new game', () => {
  describe('#ResetBoard()', () => {

    let tests = [];

    after(function() {
      commitTests(tests);
    });

    it('Reset the board after a game', () => {
      let intance_id = 'INSTANCE ID';
      tests[intance_id] = 1;

      let board = new Board(PLAYER, MULTI_PLAYER);  
      board.resetBoard();

      assert.equal(MULTI_PLAYER, board.gameMode);
      assert.equal(PLAYER, board.playerTurn);

      tests[intance_id] = 0;
    });
  });
});

describe('Be able to play single player mode', () => {
  describe('#aiTurn()', () => {

    let tests = [];

    after(function() {
      commitTests(tests);
    });

    it('AI movement', () => {
      let intance_id = 'INSTANCE ID';
      tests[intance_id] = 1;

      let board = new Board(PLAYER, MULTI_PLAYER);  
      board.resetBoard();

      board.squares = [CPU, PLAYER, CPU, null, CPU, PLAYER, null, null, PLAYER];
      board.playerTurn = CPU;

      board.aiTurn();
      assert.equal(CPU, board.squares[6]);

      tests[intance_id] = 0;
    });
  });
});


describe('The game rules should be validated', () => {
  describe('#getOutcomes() #changeTurn()', () => {

    let tests = [];

    after(function() {
      commitTests(tests);
    });

    it('Check the winning condition', () => {
      let intance_id = 'INSTANCE ID';
      tests[intance_id] = 1;

      let board = new Board(PLAYER, MULTI_PLAYER);  
      board.resetBoard();

      // Diagonal Win
      board.squares = [CPU, PLAYER, CPU, null, CPU, PLAYER, CPU, null, PLAYER];
      assert.equal(CPU, Board.getOutcomes(board.squares).winner);

      // Vertical Win
      board.squares = [CPU, PLAYER, CPU, null, PLAYER, CPU, null, PLAYER, null];
      assert.equal(PLAYER, Board.getOutcomes(board.squares).winner);

      // Horizontal Win
      board.squares = [CPU, null, null, PLAYER, PLAYER, PLAYER, null, CPU, null];
      assert.equal(PLAYER, Board.getOutcomes(board.squares).winner);

      // Draw
      board.squares = [PLAYER, CPU, PLAYER, PLAYER, CPU, CPU, CPU, PLAYER, PLAYER];
      assert.equal(DRAW, Board.getOutcomes(board.squares).winner);

      tests[intance_id] = 0;
    });

    it('Change player turn', () => {
      let intance_id = 'INSTANCE ID';
      tests[intance_id] = 1;

      let board = new Board(PLAYER, SINGLE_PLAYER);  
      board.resetBoard();

      assert.equal(PLAYER, board.playerTurn);

      board.changeTurn();
     
      assert.equal(CPU, board.playerTurn);

      tests[intance_id] = 0;
    });

    it('Piece placement', () => {
      let intance_id = 'INSTANCE ID';
      tests[intance_id] = 1;

      let board = new Board(PLAYER, SINGLE_PLAYER);  
      board.resetBoard();
      
      // Case 1:
      board.addMove(4);
      assert.equal(PLAYER, board.squares[4]);
      board.changeTurn();
      board.addMove(3);
      assert.equal(CPU, board.squares[3]);
      // ----------

      board.resetBoard();

      // Case 2 (should fail):  
      board.addMove(5);
      assert.equal(PLAYER, board.squares[5]);
      board.changeTurn();
      board.addMove(5);
      assert.equal(CPU, board.squares[5]);
      //---------

      tests[intance_id] = 0;
    });     
  });
});





/*
    it('should change the player\'s turn', () => {
      let board = new Board(PLAYER, SINGLE_PLAYER);
      board.resetBoard();
      board.changeTurn();
      assert.equal(CPU, board.playerTurn);

      assert.equal(PLAYER, board.playerTurn);
      
      console.log('cenas')
    });

    it('should place a piece on the board', () => {
      let board = new Board(PLAYER, MULTI_PLAYER);
      board.resetBoard();
      board.addMove(4);

      assert.equal(PLAYER, board.squares[4]);
    });

    it('should place a piece on the board', () => {
      let board = new Board(PLAYER, MULTI_PLAYER);
      board.resetBoard();
      board.addMove(4);

      assert.equal(PLAYER, board.squares[4]);
    });

    it('should not place a pice above another', () => {
      let board = new Board(PLAYER, MULTI_PLAYER);
      board.resetBoard();
      board.addMove(4);
      assert.equal(PLAYER, board.squares[4]);

      board.changeTurn();
      board.addMove(4);
      assert.equal(PLAYER, board.squares[4]);
    });

  });
});*/