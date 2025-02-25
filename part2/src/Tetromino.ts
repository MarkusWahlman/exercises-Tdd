export class Tetromino {
  rotationStates: string[] = [];
  rotationIndex: number;

  static get I_SHAPE() {
    return new ITetromino();
  }

  static get T_SHAPE() {
    return new TTetromino();
  }

  static get L_SHAPE() {
    return new LTetromino();
  }

  static get J_SHAPE() {
    return new JTetromino();
  }

  static get S_SHAPE() {
    return new STetromino();
  }

  static get Z_SHAPE() {
    return new ZTetromino();
  }

  static get O_SHAPE() {
    return new OTetromino();
  }

  grid: string[][];

  constructor(grid: string[][], rotationIndex = 0) {
    this.grid = grid;
    this.rotationIndex = rotationIndex;

    if ((this.constructor as any).rotationStates) {
      this.rotationStates = (this.constructor as any).rotationStates;
    }
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
    const newRotationIndex = (this.rotationIndex + 1) % (this.constructor as any).rotationStates.length;
    return new (this.constructor as any)(newRotationIndex);
  }

  rotateLeft() {
    const newRotationIndex =
      (this.rotationIndex + (this.constructor as any).rotationStates.length - 1) %
      (this.constructor as any).rotationStates.length;

    return new (this.constructor as any)(newRotationIndex);
  }
}

export class ITetromino extends Tetromino {
  static rotationStates = [
    `.....
     IIII.
     .....
     .....
     .....`,

    `...I.
     ...I.
     ...I.
     ...I.
     .....`,
  ];

  constructor(rotationIndex = 0) {
    super(Tetromino.fromString(ITetromino.rotationStates[rotationIndex]).grid, rotationIndex);
  }
}

export class TTetromino extends Tetromino {
  static rotationStates = [
    `...
     TTT
     .T.`,

    `.T.
     TT.
     .T.`,

    `...
     .T.
     TTT`,

    `.T.
     .TT
     .T.`,
  ];

  constructor(rotationIndex = 0) {
    super(Tetromino.fromString(TTetromino.rotationStates[rotationIndex]).grid, rotationIndex);
  }
}

export class LTetromino extends Tetromino {
  static rotationStates = [
    `...
     LLL
     L..`,

    `LL.
     .L.
     .L.`,

    `...
     ..L
     LLL`,

    `.L.
     .L.
     .LL`,
  ];

  constructor(rotationIndex = 0) {
    super(Tetromino.fromString(LTetromino.rotationStates[rotationIndex]).grid, rotationIndex);
  }
}

export class JTetromino extends Tetromino {
  static rotationStates = [
    `...
     JJJ
     ..J`,

    `.J.
     .J.
     JJ.`,

    `...
     J..
     JJJ`,

    `.JJ
     .J.
     .J.`,
  ];

  constructor(rotationIndex = 0) {
    super(Tetromino.fromString(JTetromino.rotationStates[rotationIndex]).grid, rotationIndex);
  }
}

export class STetromino extends Tetromino {
  static rotationStates = [
    `...
     .SS
     SS.`,

    `S..
     SS.
     .S..`,

    `...
     .SS
     SS.`,

    `S..
     SS.
     .S.`,
  ];

  constructor(rotationIndex = 0) {
    super(Tetromino.fromString(STetromino.rotationStates[rotationIndex]).grid, rotationIndex);
  }
}

export class ZTetromino extends Tetromino {
  static rotationStates = [
    `...
     ZZ.
     .ZZ`,

    `..Z
     .ZZ
     .Z.`,

    `...
     ZZ.
     .ZZ`,

    `.Z.
     ZZ.
     Z..`,
  ];

  constructor(rotationIndex = 0) {
    super(Tetromino.fromString(ZTetromino.rotationStates[rotationIndex]).grid, rotationIndex);
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
