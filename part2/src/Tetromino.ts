import { RotatingShape } from "./RotatingShape.js";

export class Tetromino {
  static get I_SHAPE() {
    return new ITetromino();
  }

  static T_SHAPE = Tetromino.fromString(
    `...
     TTT
     .T.`
  );

  static L_SHAPE = Tetromino.fromString(
    `...
     LLL
     L..`
  );

  static J_SHAPE = Tetromino.fromString(
    `...
     JJJ
     ..J`
  );

  static S_SHAPE = Tetromino.fromString(
    `...
     .SS
     SS.`
  );

  static Z_SHAPE = Tetromino.fromString(
    `...
     ZZ.
     .ZZ`
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
  rotated: boolean;

  constructor(rotated = false) {
    const newTetromino = Tetromino.fromString(
      `.....
       IIII.
       .....
       .....
       .....`
    );
    if (!rotated) {
      super(newTetromino.grid);
      this.rotated = false;
      return;
    }

    super(newTetromino.rotateRight().grid);
    this.rotated = rotated;
  }

  rotateRight(): ITetromino {
    return new ITetromino(!this.rotated);
  }

  rotateLeft(): ITetromino {
    return this.rotateRight();
  }
}

export class OTetromino extends Tetromino {
  constructor() {
    super(
      Tetromino.fromString(
        `...
         .OO
         .OO`
      ).grid
    );
  }

  rotateRight(): OTetromino {
    return this;
  }

  rotateLeft(): OTetromino {
    return this;
  }
}
