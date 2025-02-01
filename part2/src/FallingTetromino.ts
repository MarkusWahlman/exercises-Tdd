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

    this.tetromino = tetromino instanceof Tetromino ? tetromino : Tetromino.fromString(tetromino);

    const maxWidth = this.tetromino.grid[0].length;
    this.rowPos = Math.floor((board.width - maxWidth) / 2);
    this.columnPos = 0;

    for (let y = 0; y < this.tetromino.grid.length; y++) {
      for (let x = 0; x < this.tetromino.grid[y].length; x++) {
        this.board.grid[this.columnPos + y][this.rowPos + x] = this.tetromino.grid[y][x];
      }
    }
  }

  private reDraw(newTetromino: Tetromino): boolean {
    const oldTetromino = this.tetromino;

    const commonPositions: [number, number][] = [];
    for (let y = 0; y < oldTetromino.grid.length; y++) {
      for (let x = 0; x < oldTetromino.grid[y].length; x++) {
        if (newTetromino.grid[y][x] !== "." && oldTetromino.grid[y][x] !== ".") {
          commonPositions.push([y, x]);
        }
      }
    }

    this.tetromino = newTetromino;
    if (!this.canBeMoved(0, 0, commonPositions)) {
      this.tetromino = oldTetromino;
      return false;
    }

    this.drawNewTetromino(0, 0, oldTetromino);
    return true;
  }

  private canBeMoved(deltaColumn: number, deltaRow: number, ignoreList: [number, number][] = []): boolean {
    // Go through all of the blocks and check if we can move them
    let canMove = true;
    const newColumnPos = this.columnPos + deltaColumn;
    const newRowPos = this.rowPos + deltaRow;
    const rowDirection = deltaRow === 0 ? 1 : Math.sign(deltaRow);

    for (let y = 0; y < this.tetromino.grid.length; y++) {
      for (let x = 0; x < this.tetromino.grid[y].length; x++) {
        if (ignoreList.some(([cy, cx]) => cy === y && cx === x)) {
          continue;
        }

        const curBlock = this.tetromino.grid[y][x];
        if (curBlock === ".") {
          continue;
        }

        if (newColumnPos + y >= this.board.height) {
          canMove = false;
          break;
        }

        if (newRowPos + x >= this.board.width || newRowPos + x < 0) {
          canMove = false;
          break;
        }

        if (deltaColumn !== 0) {
          if (y < this.tetromino.grid.length - 1 && this.tetromino.grid[y + 1][x] !== ".") {
            continue;
          }
        }

        if (deltaRow !== 0) {
          if (this.tetromino.grid[y][x + rowDirection] && this.tetromino.grid[y][x + rowDirection] !== ".") {
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
      return false;
    }

    return true;
  }

  drawNewTetromino(deltaColumn: number, deltaRow: number, oldTetromino?: Tetromino) {
    const newColumnPos = this.columnPos + deltaColumn;
    const newRowPos = this.rowPos + deltaRow;
    const rowDirection = deltaRow === 0 ? 1 : Math.sign(deltaRow);

    for (let y = this.tetromino.grid.length - 1; y >= 0; y--) {
      for (let x2 = 0; x2 < this.tetromino.grid[y].length; x2++) {
        const x = rowDirection === -1 ? x2 : this.tetromino.grid[y].length - 1 - x2;
        if (oldTetromino) {
          if (oldTetromino.grid[y][x] !== ".") {
            this.board.grid[this.columnPos + y][this.rowPos + x] = ".";
          }
        }

        if (this.tetromino.grid[y][x] !== ".") {
          this.board.grid[this.columnPos + y][this.rowPos + x] = ".";
          this.board.grid[newColumnPos + y][newRowPos + x] = this.tetromino.grid[y][x];
        }
      }
    }
  }

  moveBy(deltaColumn: number, deltaRow: number): boolean {
    const canMove = this.canBeMoved(deltaColumn, deltaRow);

    if (!canMove) {
      return false;
    }

    this.drawNewTetromino(deltaColumn, deltaRow);

    this.columnPos = this.columnPos + deltaColumn;
    this.rowPos = this.rowPos + deltaRow;
    return true;
  }

  moveDown() {
    if (!this.isFalling) {
      return;
    }

    if (!this.moveBy(1, 0)) {
      this.isFalling = false;
    }
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

  rotateLeft(): boolean {
    if (!this.isFalling) {
      return false;
    }

    return this.reDraw(this.tetromino.rotateLeft());
  }

  rotateRight(): boolean {
    if (!this.isFalling) {
      return false;
    }

    return this.reDraw(this.tetromino.rotateRight());
  }

  lockObject() {
    this.isFalling = false;
  }
}
