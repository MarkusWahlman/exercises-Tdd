import { describe, test } from "vitest";
import { expect } from "chai";
import { rleParser } from "../src/parsing.js";

describe("RLE Parser", () => {
  test("Works with minimal RLE data", () => {
    const data = "x = 1, y = 2";

    const parsedData = rleParser(data);

    expect(parsedData.headerLine).to.equal("x = 1, y = 2");
  });

  test("Ignores comments", () => {
    const data = `#C
    #N Blinker
    #O John Conway
    x = 1, y = 2`;
    const parsedData = rleParser(data);

    expect(parsedData.headerLine).to.equal("x = 1, y = 2");
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

  //Throws error for non numeric x or y
  //Throws error for variables in header line that are not recognized
  //
});
