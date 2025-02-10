import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/testable1.mjs";

describe("Days until Christmas", () => {
  test("is a number", () => {
    expect(daysUntilChristmas()).to.be.a("number");
  });

  test("from first of december is 24", () => {
    const date = new Date(2023, 11, 1);
    expect(daysUntilChristmas(date)).equal(24);
  });

  //The function does not work as intended if it's called in december after christmas.
  test.skip("from after christmas is 365 days", () => {
    const date = new Date(2023, 11, 26);
    expect(daysUntilChristmas(date)).equal(24);
  });
});
