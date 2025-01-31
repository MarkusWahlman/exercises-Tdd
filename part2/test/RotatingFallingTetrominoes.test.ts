import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.js";
import { Tetromino } from "../src/Tetromino.js";

function fallToBottom(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

function moveBlockLeft(board: Board, times: number) {
  for (let i = 0; i < times; i++) {
    board.moveLeft();
  }
}

function moveBlockRight(board: Board, times: number) {
  for (let i = 0; i < times; i++) {
    board.moveRight();
  }
}

function moveBlockDown(board: Board, times: number) {
  for (let i = 0; i < times; i++) {
    board.moveDown();
  }
}

describe("Rotating falling tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 8);
  });

  test("can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be rotated if there is no room", () => {
    board.drop(Tetromino.L_SHAPE);
    board.rotateLeft();
    moveBlockLeft(board, 3);
    fallToBottom(board);

    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    moveBlockLeft(board, 10);
    moveBlockDown(board, 4);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       I.........
       IL........
       IL........
       ILL.......`
    );
  });

  test("can wallkick from left wall when rotating right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    moveBlockLeft(board, 10);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       TTT.......
       .T........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("can wallkick from right wall when rotating left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    moveBlockRight(board, 10);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       .......TTT
       ........T.
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("can wallkick from other blocks", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    moveBlockRight(board, 2);
    moveBlockDown(board, 5);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .....I....
       .....I....
       .....ITTT.
       .....I.T..`
    );
  });
});
