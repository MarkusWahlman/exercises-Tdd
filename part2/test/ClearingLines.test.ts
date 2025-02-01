import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.js";
import { Tetromino } from "../src/Tetromino.js";

function fallToBottom(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Clearing lines", () => {
  describe("When a line is full", () => {
    let board: Board;
    beforeEach(() => {
      board = new Board(8, 8);
    });

    test("it gets cleared", () => {
      board.drop(Tetromino.I_SHAPE);
      board.moveLeft();
      fallToBottom(board);

      board.drop(Tetromino.I_SHAPE);
      board.moveRight();
      board.moveRight();
      board.moveRight();
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `........
         ........
         ........
         ........
         ........
         ........
         ........
         ........`
      );
    });

    test("other blocks drop down", () => {
      board.drop(Tetromino.I_SHAPE);
      board.moveLeft();
      fallToBottom(board);

      board.drop(Tetromino.T_SHAPE);
      board.moveLeft();
      board.moveLeft();
      fallToBottom(board);

      board.drop(Tetromino.I_SHAPE);
      board.moveRight();
      board.moveRight();
      board.moveRight();
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `........
         ........
         ........
         ........
         ........
         ........
         TTT.....
         .T......`
      );
    });
  });

  describe("When multiple lines are full", () => {
    let board: Board;
    beforeEach(() => {
      board = new Board(8, 8);
    });

    test("they get cleared", () => {
      board.drop(Tetromino.O_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      fallToBottom(board);

      board.drop(Tetromino.O_SHAPE);
      board.moveLeft();
      fallToBottom(board);

      board.drop(Tetromino.O_SHAPE);
      board.moveRight();
      fallToBottom(board);

      board.drop(Tetromino.O_SHAPE);
      board.moveRight();
      board.moveRight();
      board.moveRight();
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `........
         ........
         ........
         ........
         ........
         ........
         ........
         ........`
      );
    });

    test("other blocks drop down multiple lines", () => {
      board.drop(Tetromino.O_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      fallToBottom(board);

      board.drop(Tetromino.O_SHAPE);
      board.moveLeft();
      fallToBottom(board);

      board.drop(Tetromino.O_SHAPE);
      board.moveRight();
      fallToBottom(board);

      board.drop(Tetromino.T_SHAPE);
      board.moveLeft();
      board.moveLeft();
      fallToBottom(board);

      board.drop(Tetromino.O_SHAPE);
      board.moveRight();
      board.moveRight();
      board.moveRight();
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `........
         ........
         ........
         ........
         ........
         ........
         TTT.....
         .T......`
      );
    });
  });
});
