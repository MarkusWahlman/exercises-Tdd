export class Board {
  width;
  height;
  grid: Array<string[]>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: height }, () => Array(width).fill("."));
  }

  drop(block: string) {
    const middleX = Math.floor(this.width / 2);
    this.grid[0][middleX] = block;
  }

  tick() {
    for (let column = this.grid.length - 1; column >= 0; column--) {
      for (let row = 0; row < this.grid[column].length; row++) {
        const curBlock = this.grid[column][row];
        if (curBlock === ".") {
          continue;
        }

        const nextBlock = this.grid[column][row + 1];
        if (!nextBlock || nextBlock !== ".") {
          continue;
        }

        this.grid[column + 1][row] = curBlock;
        this.grid[column][row] = ".";
      }
    }
  }

  toString() {
    let boardAsString = "";
    for (let row = 0; row < this.grid.length; row++) {
      for (let column = 0; column < this.grid[row].length; column++) {
        boardAsString += this.grid[row][column];
      }
      boardAsString += "\n";
    }
    return boardAsString;
  }
}
