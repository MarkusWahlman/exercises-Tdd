export class RotatingShape {
  grid: string[][] = [];

  constructor(grid: string[][]) {
    this.grid = grid;
  }

  static fromString(shape: string): RotatingShape {
    const grid = shape
      .trim()
      .split("\n")
      .map((row) => row.trim().split(""));

    return new RotatingShape(grid);
  }

  toString() {
    return this.grid.map((row) => row.join("")).join("\n") + "\n";
  }

  rotateRight() {
    const rotatedGrid = this.grid[0].map((_, colIndex) => this.grid.map((row) => row[colIndex]).reverse());
    return new RotatingShape(rotatedGrid);
  }

  rotateLeft() {
    const rotatedGrid = this.grid[0].map((_, colIndex) => this.grid.map((row) => row[row.length - 1 - colIndex]));
    return new RotatingShape(rotatedGrid);
  }
}
