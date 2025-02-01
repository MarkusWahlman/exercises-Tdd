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

  private wallKickRotate(rotateFn: () => boolean | undefined) {
    if (rotateFn()) {
      return;
    }

    if (this.tryMoveAndRotate(0, -1, rotateFn) || this.tryMoveAndRotate(0, 1, rotateFn)) {
      return;
    }
  }

  private tryMoveAndRotate(dx: number, dy: number, rotateFn: () => boolean | undefined): boolean {
    if (this.activeObject?.moveBy(dx, dy)) {
      if (rotateFn()) {
        return true;
      }

      this.activeObject.moveBy(-dx, -dy);
    }
    return false;
  }

  rotateLeft() {
    this.wallKickRotate(() => this.activeObject?.rotateLeft());
  }

  rotateRight() {
    this.wallKickRotate(() => this.activeObject?.rotateRight());
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
