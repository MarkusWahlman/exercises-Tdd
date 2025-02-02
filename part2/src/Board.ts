import { FallingTetromino } from "./FallingTetromino.js";
import { Tetromino } from "./Tetromino.js";

export class Board {
  width;
  height;
  grid: string[][];
  activeObject?: FallingTetromino;
  onClearLine?: (lineCount: number) => void;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: height }, () => Array(width).fill("."));
  }

  cellAt(row: number, column: number) {
    return this.grid[row][column];
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

  private clearFullLines() {
    let linesCleared = 0;
    const newGrid = this.grid.filter((row) => row.some((cell) => cell === "."));

    linesCleared = this.grid.length - newGrid.length;
    if (!linesCleared) {
      return;
    }

    while (newGrid.length < this.grid.length) {
      newGrid.unshift(new Array(this.grid[0].length).fill("."));
    }

    this.grid = newGrid;

    if (this.onClearLine && linesCleared > 0) {
      this.onClearLine(linesCleared);
    }
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
    if (this.activeObject && this.activeObject.isFalling) {
      this.activeObject.moveDown();
    } else {
      this.clearFullLines();
    }
  }

  hasFalling() {
    return this.activeObject?.isFalling;
  }

  toString() {
    return this.grid.map((row) => row.join("")).join("\n") + "\n";
  }
}
