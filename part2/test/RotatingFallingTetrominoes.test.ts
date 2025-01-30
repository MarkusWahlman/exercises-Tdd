import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.js";
import { Tetromino } from "../src/Tetromino.js";

function moveToLeftWall(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.moveLeft();
  }
}

describe("Rotating falling tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });
});
