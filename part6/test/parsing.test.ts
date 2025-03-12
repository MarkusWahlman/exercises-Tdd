import { describe, test } from "vitest";
import { expect } from "chai";
import { boardToRleParser, rleToBoardParser } from "../src/parsing.js";
import { GameBoard } from "../src/GameOfLife.js";

describe("RLE to GameBoard parser", () => {
  test("works with minimal RLE data", () => {
    const data = "x = 1, y = 2";

    const parsedData = rleToBoardParser(data);

    expect(parsedData.width).to.equal(1);
    expect(parsedData.height).to.equal(2);
  });

  test("ignores comments", () => {
    const data = `#C
    #N Blinker
    #O John Conway
    x = 1, y = 2`;
    const parsedData = rleToBoardParser(data);

    expect(parsedData.width).to.equal(1);
    expect(parsedData.height).to.equal(2);
  });

  test("throws error for empty data string", () => {
    const data = "";
    let error;

    try {
      rleToBoardParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Empty header line"));
  });

  test("throws error for invalid header line", () => {
    const data = "not a valid headerline!";
    let error;

    try {
      rleToBoardParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Invalid header line"));
  });

  test("throws error for non numeric x", () => {
    const data = "x = q, y = 5";
    let error;

    try {
      rleToBoardParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Variable x should be a number"));
  });

  test("throws error for non numeric y", () => {
    const data = "x = 5, y = q";
    let error;

    try {
      rleToBoardParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Variable y should be a number"));
  });

  test("throws error for not recognized variables", () => {
    const data = "x = 5, y = 5, q = 5";
    let error;

    try {
      rleToBoardParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Invalid header line variable name"));
  });

  test("works with rules", () => {
    const data = "x = 1, y = 2, rule = B3/S23";

    const parsedData = rleToBoardParser(data);

    expect(parsedData.width).to.equal(1);
    expect(parsedData.height).to.equal(2);
    expect(parsedData.rule).to.equal("B3/S23");
  });

  test("throws error for invalid rule", () => {
    const data = "x = 1, y = 2, rule = B36/S23";

    let error;
    try {
      rleToBoardParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Invalid rule"));
  });

  test("throws error for insufficient header line when y is missing", () => {
    const data = "x = 1, rule = B3/S23";

    let error;
    try {
      rleToBoardParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Insufficient header line"));
  });

  test("throws error for insufficient header line when x is missing", () => {
    const data = "y = 1, rule = B3/S23";

    let error;
    try {
      rleToBoardParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Insufficient header line"));
  });

  test("works with blinker pattern", () => {
    const data = `x = 3, y = 1, rule = B3/S23
      3o!`;

    const parsedData = rleToBoardParser(data);

    expect(parsedData.width).to.equal(3);
    expect(parsedData.height).to.equal(1);
    expect(parsedData.rule).to.equal("B3/S23");
    expect(parsedData.grid).to.deep.equal([[true, true, true]]);
  });

  test("works with glider pattern", () => {
    const data = `x = 3, y = 3, rule = B3/S23
      bob$2bo$3o!`;

    const parsedData = rleToBoardParser(data);

    expect(parsedData.grid).to.deep.equal([
      [false, true, false],
      [false, false, true],
      [true, true, true],
    ]);
  });

  test("throws error for invalid pattern character", () => {
    const data = `x = 3, y = 3, rule = B3/S23
      boz$2bo$3o!`;

    let error;
    try {
      rleToBoardParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Invalid pattern character"));
  });

  test("line ends get filled with dead cells", () => {
    const data = `x = 3, y = 3, rule = B3/S23
      bo$o$2o!`;

    const parsedData = rleToBoardParser(data);

    expect(parsedData.grid).to.deep.equal([
      [false, true, false],
      [true, false, false],
      [true, true, false],
    ]);
  });

  test("throws error for too long pattern", () => {
    const data = `x = 3, y = 3, rule = B3/S23
      bobo$obo$obo!`;

    let error;
    try {
      rleToBoardParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Pattern length more than width"));
  });

  test("works with glider pattern", () => {
    const data = `x = 2, y = 2, rule = B3/S23
      2o$2o!`;

    const parsedData = rleToBoardParser(data);

    expect(parsedData.grid).to.deep.equal([
      [true, true],
      [true, true],
    ]);
  });

  test("throws error for pattern without end", () => {
    const data = `x = 2, y = 2, rule = B3/S23
      2o$2o`;

    let error;
    try {
      rleToBoardParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Pattern has no end"));
  });

  test("works with bigger numbers", () => {
    const data = `x = 23, y = 3, rule = B3/S23
      11o5b4o$11o5b4o$11o5b4o!`;

    const parsedData = rleToBoardParser(data);

    expect(parsedData.grid).to.deep.equal([
      [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
      ],
      [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
      ],
      [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
      ],
    ]);
  });
});

describe("GameBoard to RLE parser", () => {
  test("works with minimal GameBoard", () => {
    const board: GameBoard = {
      width: 3,
      height: 3,
      rule: "",
      grid: [],
    };
    const parsedRle = boardToRleParser(board);
    expect(parsedRle).to.equal(`x = 3, y = 3`);
  });

  test("works with rules", () => {
    const board: GameBoard = {
      width: 3,
      height: 3,
      rule: "B3/S23",
      grid: [],
    };
    const parsedRle = boardToRleParser(board);
    expect(parsedRle).to.equal(`x = 3, y = 3, rule = B3/S23`);
  });

  test("works with simple pattern grid", () => {
    const board: GameBoard = {
      width: 3,
      height: 3,
      rule: "B3/S23",
      grid: [
        [true, false, true],
        [true, false, true],
        [true, false, true],
      ],
    };
    const parsedRle = boardToRleParser(board);
    expect(parsedRle).to.equal(`x = 3, y = 3, rule = B3/S23
obo$obo$obo!`);
  });

  test("removes trailing dead cells", () => {
    const board: GameBoard = {
      width: 4,
      height: 3,
      rule: "B3/S23",
      grid: [
        [true, true, false, false],
        [true, true, false, false],
        [true, true, false, false],
      ],
    };
    const parsedRle = boardToRleParser(board);
    expect(parsedRle).to.equal(`x = 4, y = 3, rule = B3/S23
2o$2o$2o!`);
  });
});
