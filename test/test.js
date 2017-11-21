var assert = require('assert');
var http = require('http');
var postData = require('./practitest.js');
let Board = require('./../Board.js');


const PLAYER = 0;
const CPU = 1;
const SINGLE_PLAYER = 0;
const MULTI_PLAYER = 1;


describe('Change Player', () => {
  describe('#ResetBoard()', () => {

    afterEach(function() {
      if (this.currentTest.state === 'failed') {
        postData({
          data: { 
            attributes: { 
                'instance-id': 7539908, 
                'exit-code': 1 
            } 
          }   
        });
      }
    });

    it('should initialize a new Game', () => {
      let board = new Board(PLAYER, MULTI_PLAYER);      
      assert.equal(MULTI_PLAYER, board.gameMode);

      board.resetBoard();
      assert.equal(PLAYER, board.playerTurn);
    });

    it('should change the player\'s turn', () => {
      let board = new Board(PLAYER, SINGLE_PLAYER);
      board.resetBoard();
      board.changeTurn();
      assert.equal(CPU, board.playerTurn);
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
});