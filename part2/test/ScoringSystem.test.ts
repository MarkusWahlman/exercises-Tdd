import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ScoringSystem } from "../src/ScoringSystem.js";

function clearLine(scoringSystem: ScoringSystem, times = 1) {
  for (let i = 0; i < times; i++) {
    scoringSystem.linesCleared(1);
  }
}

describe("Scoring system", () => {
  let scoringSystem: ScoringSystem;

  beforeEach(() => {
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
      expect(scoringSystem.score).equal(400);
    });

    test("the level rises to 1", () => {
      expect(scoringSystem.level).equal(1);
    });
  });

  describe("When total 110 lines gets cleared", () => {
    beforeEach(() => {
      clearLine(scoringSystem, 110);
    });

    test("the score points rise to 26400", () => {
      expect(scoringSystem.score).equal(26400);
    });

    test("the level rises to 10", () => {
      expect(scoringSystem.level).equal(10);
    });
  });

  describe("When 4 lines get cleared", () => {
    beforeEach(() => {
      scoringSystem.linesCleared(4);
    });

    test("the score raises to 1200", () => {
      expect(scoringSystem.score).equal(1200);
    });
  });
});
