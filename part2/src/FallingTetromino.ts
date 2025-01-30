import { Board } from "./Board.js";
import { Tetromino } from "./Tetromino.js";

export class FallingTetromino {
  board: Board;
  columnPos: number;
  rowPos: number;
  tetromino: Tetromino;
  isFalling: boolean;

  constructor(board: Board, tetromino: Tetromino | string) {
    this.board = board;
    this.isFalling = true;

    this.tetromino = Tetromino.fromString(tetromino.toString());

    const maxWidth = this.tetromino.grid[0].length;
    this.rowPos = Math.floor((board.width - maxWidth) / 2);
    this.columnPos = 0;

    for (let y = 0; y < this.tetromino.grid.length; y++) {
      for (let x = 0; x < this.tetromino.grid[y].length; x++) {
        this.board.grid[this.columnPos + y][this.rowPos + x] = this.tetromino.grid[y][x];
      }
    }
  }

  private moveBy(deltaColumn: number, deltaRow: number): boolean {
    // Go through all of the blocks and check if we can move them
    let canMove = true;
    const newColumnPos = this.columnPos + deltaColumn;
    const newRowPos = this.rowPos + deltaRow;
    const rowDirection = deltaRow === 0 ? 1 : Math.sign(deltaRow);

    for (let y = 0; y < this.tetromino.grid.length; y++) {
      for (let x = 0; x < this.tetromino.grid[y].length; x++) {
        const curBlock = this.tetromino.grid[y][x];
        if (curBlock === ".") {
          continue;
        }

        if (newColumnPos + y >= this.board.height) {
          canMove = false;
          break;
        }

        if (newRowPos + x >= this.board.width || newRowPos + x < 0) {
          return false;
        }

        if (deltaColumn !== 0) {
          if (y < this.tetromino.grid.length - 1 && this.tetromino.grid[y + 1][x] !== ".") {
            continue;
          }
        }

        if (deltaRow !== 0) {
          if (this.tetromino.grid[y][x + rowDirection] !== ".") {
            continue;
          }
        }

        if (this.board.grid[newColumnPos + y][newRowPos + x] !== ".") {
          canMove = false;
          break;
        }
      }
      if (!canMove) {
        break;
      }
    }

    if (!canMove) {
      this.lockObject();
      return false;
    }

    //Move the blocks
    for (let y = this.tetromino.grid.length - 1; y >= 0; y--) {
      for (let x2 = 0; x2 < this.tetromino.grid[y].length; x2++) {
        const x = rowDirection === -1 ? x2 : this.tetromino.grid[y].length - 1 - x2;
        if (this.tetromino.grid[y][x] === ".") {
          continue;
        }
        this.board.grid[this.columnPos + y][this.rowPos + x] = ".";
        this.board.grid[newColumnPos + y][newRowPos + x] = this.tetromino.grid[y][x];
      }
    }

    this.columnPos = newColumnPos;
    this.rowPos = newRowPos;
    return true;
  }

  moveDown() {
    if (!this.isFalling) {
      return;
    }

    this.moveBy(1, 0);
  }

  moveLeft() {
    if (!this.isFalling) {
      return;
    }

    this.moveBy(0, -1);
  }

  moveRight() {
    if (!this.isFalling) {
      return;
    }

    this.moveBy(0, 1);
  }

  lockObject() {
    this.isFalling = false;
  }
}
