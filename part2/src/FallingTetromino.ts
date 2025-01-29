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

    const maxWidth = Math.max(...this.tetromino.grid.map((line) => line.length));
    this.rowPos = Math.floor((board.width - maxWidth) / 2);
    this.columnPos = 0;

    for (let y = 0; y < this.tetromino.grid.length; y++) {
      for (let x = 0; x < this.tetromino.grid[y].length; x++) {
        this.board.grid[this.columnPos + y][this.rowPos + x] = this.tetromino.grid[y][x];
      }
    }
  }

  moveDown() {
    if (!this.isFalling) {
      return;
    }

    // Go through all of the blocks and check if we can move them
    let canMove = true;
    const newColumnPos = this.columnPos + 1;

    for (let y = 0; y < this.tetromino.grid.length; y++) {
      for (let x = 0; x < this.tetromino.grid[y].length; x++) {
        const curBlock = this.tetromino.grid[y][x];
        if (curBlock === ".") {
          continue;
        }

        if (newColumnPos + y >= this.board.height) {
          this.lockObject();
          return;
        }

        if (y < this.tetromino.grid.length - 1 && this.tetromino.grid[y + 1][x] !== ".") {
          continue;
        }

        if (this.board.grid[newColumnPos + y][this.rowPos + x] !== ".") {
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
      return;
    }

    //Move the blocks
    for (let y = this.tetromino.grid.length - 1; y >= 0; y--) {
      for (let x = 0; x < this.tetromino.grid[y].length; x++) {
        if (this.tetromino.grid[y][x] === ".") {
          continue;
        }
        this.board.grid[this.columnPos + y][this.rowPos + x] = ".";
        this.board.grid[newColumnPos + y][this.rowPos + x] = this.tetromino.grid[y][x];
      }
    }
    this.columnPos = newColumnPos;
  }

  lockObject() {
    this.isFalling = false;
  }
}
