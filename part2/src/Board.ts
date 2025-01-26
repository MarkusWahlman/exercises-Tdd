import { Block } from "./Block.js";

export class Board {
  width;
  height;
  grid: string[][];
  activeBlock?: Block;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: height }, () => Array(width).fill("."));
  }

  drop(block: string) {
    this.activeBlock = new Block(this, "X");
  }

  tick() {
    this.activeBlock?.moveDown();
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
