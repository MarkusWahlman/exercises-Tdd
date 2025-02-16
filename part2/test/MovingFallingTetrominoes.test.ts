import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.js";
import { Tetromino } from "../src/Tetromino.js";

function moveToLeftWall(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.moveLeft();
  }
}

function moveToRightWall(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
}

function fallToBottom(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Moving falling tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `..........
       ....TTT...
       .....T....
       ..........
       ..........
       ..........`
    );
  });

  test("can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..TTT.....
       ...T......
       ..........
       ..........
       ..........`
    );
  });

  test("can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ..........
       ..........`
    );
  });

  test("stop when they hit the left wall", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToLeftWall(board);
    expect(board.toString()).to.equalShape(
      `..........
       TTT.......
       .T........
       ..........
       ..........
       ..........`
    );
  });

  test("stop when they hit the right wall", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToRightWall(board);
    expect(board.toString()).to.equalShape(
      `..........
       .......TTT
       ........T.
       ..........
       ..........
       ..........`
    );
  });

  test("stop when they hit the bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToLeftWall(board);
    fallToBottom(board);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       TTT.......
       .T........`
    );
  });

  test("stop when they move left and hit on another block", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToLeftWall(board);
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    board.moveDown();
    board.moveDown();

    moveToLeftWall(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       TTTTTT....
       .T..T.....`
    );
  });

  test("stop when they move right and hit on another block", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToRightWall(board);
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    board.moveDown();
    board.moveDown();

    moveToRightWall(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....TTTTTT
       .....T..T.`
    );
  });

  test("stop when they move right and land on another block", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToRightWall(board);
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .....TTT..
       ......TTTT
       ........T.`
    );
  });
});
