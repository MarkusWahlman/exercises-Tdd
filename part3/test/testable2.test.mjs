import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue, diceRoll } from "../src/testable2.mjs";

describe("Dice roll", () => {
  test("returns numbers", () => {
    expect(diceRoll()).to.be.a("number");
  });

  test("returns expected values with mock random function", () => {
    const mockRandom = () => 0.9;
    expect(diceRoll(mockRandom)).to.equal(6);

    const mockRandom2 = () => 0.0;
    expect(diceRoll(mockRandom2)).to.equal(1);
  });
});

describe("Dice hand value ", () => {
  test("returns numbers", () => {
    expect(diceHandValue()).to.be.a("number");
  });

  test("returns correct value for pair", () => {
    expect(diceHandValue(5, 5)).to.equal(105);
  });

  test("returns correct value for high die", () => {
    expect(diceHandValue(5, 8)).to.equal(8);
    expect(diceHandValue(3, 1)).to.equal(3);
  });
});
