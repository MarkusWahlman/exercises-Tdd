import { describe, test } from "vitest";
import { expect } from "chai";
import { rleParser } from "../src/parsing.js";

describe("RLE Parser", () => {
  test("Works with minimal RLE data", () => {
    const data = "x = 1, y = 2";

    const parsedData = rleParser(data);

    expect(parsedData.width).to.equal(1);
    expect(parsedData.height).to.equal(2);
  });

  test("Ignores comments", () => {
    const data = `#C
    #N Blinker
    #O John Conway
    x = 1, y = 2`;
    const parsedData = rleParser(data);

    expect(parsedData.width).to.equal(1);
    expect(parsedData.height).to.equal(2);
  });

  test("Throws error for empty data string", () => {
    const data = "";
    let error;

    try {
      rleParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Empty header line"));
  });

  test("Throws error for invalid header line", () => {
    const data = "not a valid headerline!";
    let error;

    try {
      rleParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Invalid header line"));
  });

  test("Throws error for non numeric x", () => {
    const data = "x = q, y = 5";
    let error;

    try {
      rleParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Variable x should be a number"));
  });

  test("Throws error for non numeric y", () => {
    const data = "x = 5, y = q";
    let error;

    try {
      rleParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Variable y should be a number"));
  });

  test("Throws error for not recognized variables", () => {
    const data = "x = 5, y = 5, q = 5";
    let error;

    try {
      rleParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Invalid header line variable name"));
  });

  test("Works with rules", () => {
    const data = "x = 1, y = 2, rule = B3/S23";

    const parsedData = rleParser(data);

    expect(parsedData.width).to.equal(1);
    expect(parsedData.height).to.equal(2);
    expect(parsedData.rule).to.equal("B3/S23");
  });

  test("Throws error for invalid rule", () => {
    const data = "x = 1, y = 2, rule = B36/S23";

    let error;
    try {
      rleParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Invalid rule"));
  });

  test("Throws error for insufficient header line when y is missing", () => {
    const data = "x = 1, rule = B3/S23";

    let error;
    try {
      rleParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Insufficient header line"));
  });

  test("Throws error for insufficient header line when x is missing", () => {
    const data = "y = 1, rule = B3/S23";

    let error;
    try {
      rleParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Insufficient header line"));
  });

  test("Works with blinker pattern", () => {
    const data = `x = 3, y = 1, rule = B3/S23
      3o!`;

    const parsedData = rleParser(data);

    expect(parsedData.width).to.equal(3);
    expect(parsedData.height).to.equal(1);
    expect(parsedData.rule).to.equal("B3/S23");
    expect(parsedData.board).to.deep.equal([[true, true, true]]);
  });

  test("Works with glider pattern", () => {
    const data = `x = 3, y = 3, rule = B3/S23
      bob$2bo$3o!`;

    const parsedData = rleParser(data);

    expect(parsedData.width).to.equal(3);
    expect(parsedData.height).to.equal(3);
    expect(parsedData.rule).to.equal("B3/S23");
    expect(parsedData.board).to.deep.equal([
      [false, true, false],
      [false, false, true],
      [true, true, true],
    ]);
  });

  test("Throws error for invalid pattern character", () => {
    const data = `x = 3, y = 3, rule = B3/S23
      boz$2bo$3o!`;

    let error;
    try {
      rleParser(data);
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("Invalid pattern character"));
  });

  //Throws error for too long pattern

  //Doesn't go out of bouds if we the pattern is longer than the width

  //Works with blinker pattern?

  //Works with glider pattern?

  //Works with block pattern?

  //Throws error for pattern without end
});
