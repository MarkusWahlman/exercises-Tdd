import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.js";
import { ShuffleBag } from "../src/ShuffleBag.js";
describe("Shuffle bag", () => {
    const allTetrominoes = [
        Tetromino.I_SHAPE,
        Tetromino.T_SHAPE,
        Tetromino.L_SHAPE,
        Tetromino.J_SHAPE,
        Tetromino.S_SHAPE,
        Tetromino.Z_SHAPE,
        Tetromino.O_SHAPE,
    ];
    let shuffleBag;
    beforeEach(() => {
        shuffleBag = new ShuffleBag(allTetrominoes);
    });
    test("should return a valid tetromino", () => {
        expect(shuffleBag.next()).to.be.oneOf(allTetrominoes);
    });
    test("should return all pieces before repeating", () => {
        const drawn = new Set();
        for (let i = 0; i < 7; i++) {
            drawn.add(shuffleBag.next());
        }
        expect(drawn.size).to.equal(allTetrominoes.length);
    });
});
