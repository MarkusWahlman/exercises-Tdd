import { Board } from "./Board.js";

export class Block {
  board: Board;
  column: number;
  row: number;
  symbol: string;

  constructor(board: Board, symbol: string) {
    this.board = board;
    this.row = Math.floor(board.width / 2);
    this.column = 0;
    this.symbol = symbol;

    this.board.grid[this.column][this.row] = symbol;
  }

  moveDown() {
    if (this.column + 1 >= this.board.height || this.board.grid[this.column + 1][this.row] !== ".") {
      return;
    }

    this.board.grid[this.column][this.row] = ".";
    this.column += 1;
    this.board.grid[this.column][this.row] = this.symbol;
  }
}
