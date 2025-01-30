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
       ...TT.....
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
       ....TT....
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
    board.rotateRight();
    moveBlockLeft(board, 3);
    fallToBottom(board);

    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    moveBlockLeft(board, 10);
    fallToBottom(board);
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

  test.skip("can wallkick from left wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    moveBlockLeft(board, 10);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       I.........
       IL........
       IL........
       ILL.......`
    );
  });
});
