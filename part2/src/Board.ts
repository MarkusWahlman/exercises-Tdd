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
    if (!this.activeObject?.rotateLeft()) {
      let wasMoved = this.activeObject?.moveBy(0, -1);
      if (!wasMoved) {
        wasMoved = this.activeObject?.moveBy(0, 1);
      }
      if (wasMoved) {
        this.activeObject?.rotateLeft();
      }
    }
  }

  rotateRight(): boolean {
    if (!this.activeObject?.rotateRight()) {
      let wasMovedLeft = this.activeObject?.moveBy(0, -1);
      if (wasMovedLeft) {
        if (this.activeObject?.rotateRight()) {
          return true;
        }
        //Couldn't rotate, move back
        this.activeObject?.moveBy(0, 1);
      }

      let wasMovedRight = this.activeObject?.moveBy(0, 1);
      if (wasMovedRight) {
        if (this.activeObject?.rotateRight()) {
          return true;
        }
        return true;
        //Couldn't rotate, move back
        this.activeObject?.moveBy(0, -1);
      }
    }
    return false;
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
