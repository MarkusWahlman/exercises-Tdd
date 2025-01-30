import { FallingTetromino } from "./FallingTetromino.js";
import { Tetromino } from "./Tetromino.js";

export class Board {
  width;
  height;
  grid: string[][];
  activeObject?: FallingTetromino;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: height }, () => Array(width).fill("."));
  }

  drop(object: string | Tetromino) {
    if (!this.activeObject || !this.activeObject.isFalling) {
      this.activeObject = new FallingTetromino(this, object);
    } else {
      throw "already falling";
    }
  }

  moveLeft() {
    this.activeObject?.moveLeft();
  }

  moveRight() {
    this.activeObject?.moveRight();
  }

  moveDown() {
    this.activeObject?.moveDown();
  }

  rotateLeft() {
    this.activeObject?.rotateLeft();
  }

  tick() {
    this.activeObject?.moveDown();
  }

  hasFalling() {
    return this.activeObject?.isFalling;
  }

  toString() {
    return this.grid.map((row) => row.join("")).join("\n") + "\n";
  }
}
