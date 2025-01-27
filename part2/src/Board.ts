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

  drop(symbol: string) {
    if (!this.activeBlock || !this.activeBlock.isFalling) {
      this.activeBlock = new Block(this, symbol);
    } else {
      throw "already falling";
    }
  }

  tick() {
    this.activeBlock?.moveDown();
  }

  hasFalling() {
    return this.activeBlock?.isFalling;
  }

  toString() {
    return this.grid.map((row) => row.join("")).join("\n") + "\n";
  }
}
