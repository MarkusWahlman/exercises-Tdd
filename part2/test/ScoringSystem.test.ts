import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.js";
import { ScoringSystem } from "../src/ScoringSystem.js";
import { Tetromino } from "../src/Tetromino.js";

function clearLine(scoringSystem: ScoringSystem, times = 1) {
  for (let i = 0; i < times; i++) {
    scoringSystem.linesCleared(1);
  }
}

describe("Scoring system", () => {
  let board: Board;
  let scoringSystem: ScoringSystem;

  beforeEach(() => {
    board = new Board(8, 8);
    scoringSystem = new ScoringSystem();
  });

  test("The score starts from zero", () => {
    expect(scoringSystem.score).equal(0);
  });

  describe("When a line gets cleared", () => {
    beforeEach(() => {
      clearLine(scoringSystem);
    });

    test("the score points rise by 40", () => {
      expect(scoringSystem.score).equal(40);
    });
  });

  describe("When total 10 lines gets cleared", () => {
    beforeEach(() => {
      clearLine(scoringSystem, 10);
    });

    test("the score points rise to 400", () => {
      board.drop(Tetromino.I_SHAPE);
      console.log(board.toString());

      expect(scoringSystem.score).equal(400);
    });
  });
});
