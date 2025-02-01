import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.js";
import { Tetromino } from "../src/Tetromino.js";

function fallToBottom(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

function doOneClear(board: Board, times = 1) {
  for (let i = 0; i < times; i++) {
    board.drop(Tetromino.I_SHAPE);
    board.moveLeft();
    fallToBottom(board);

    board.drop(Tetromino.I_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);
  }
}

describe("Clearing lines", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(8, 8);
  });

  describe("When a line gets full", () => {
    test("it gets cleared", () => {
      doOneClear(board);

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

    test("it can get cleared multiple times", () => {
      doOneClear(board, 5);
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
