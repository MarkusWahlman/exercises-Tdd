import { RotatingShape } from "./RotatingShape.js";

export class Tetromino {
  static get I_SHAPE() {
    return new ITetromino();
  }

  // prettier-ignore
  static T_SHAPE = Tetromino.fromString(
    [
      ".T.", 
      "TTT", 
      "..."
    ].join("\n")
  );

  // prettier-ignore
  static L_SHAPE = Tetromino.fromString(
    [
      "..L",
      "LLL",
      "..."
    ].join("\n")
  );

  // prettier-ignore
  static J_SHAPE = Tetromino.fromString(
    [
      "J..",
      "JJJ",
      "..."
    ].join("\n")
  );

  // prettier-ignore
  static S_SHAPE = Tetromino.fromString(
    [
      ".SS",
      "SS.",
      "..."
    ].join("\n")
  );

  // prettier-ignore
  static Z_SHAPE = Tetromino.fromString(
    [
      "ZZ.",
      ".ZZ",
      "..."
    ].join("\n")
  );

  static get O_SHAPE() {
    return new OTetromino();
  }

  grid: string[][];

  constructor(grid: string[][]) {
    this.grid = grid;
  }

  static fromString(shape: string): Tetromino {
    const grid = shape
      .trim()
      .split("\n")
      .map((row) => row.trim().split(""));

    return new Tetromino(grid);
  }

  toString(): string {
    return this.grid.map((row) => row.join("")).join("\n") + "\n";
  }

  rotateRight() {
    const rotatingShape = RotatingShape.fromString(this.toString());
    return Tetromino.fromString(rotatingShape.rotateRight().toString());
  }

  rotateLeft() {
    const rotatingShape = RotatingShape.fromString(this.toString());
    return Tetromino.fromString(rotatingShape.rotateLeft().toString());
  }
}

export class ITetromino extends Tetromino {
  constructor() {
    // prettier-ignore
    super(Tetromino.fromString(
        [
            ".....", 
            ".....", 
            "IIII.",
            ".....",
            "....."
        ].join("\n")).grid);
  }

  rotateLeft(): Tetromino {
    return this.rotateRight();
  }
}

export class OTetromino extends Tetromino {
  constructor() {
    // prettier-ignore
    super(Tetromino.fromString(
        [
            ".OO", 
            ".OO", 
            "..."
        ].join("\n")).grid);
  }

  rotateRight(): Tetromino {
    return this;
  }

  rotateLeft(): Tetromino {
    return this;
  }
}
