export type GameBoard = {
  width: number;
  height: number;
  rule: string;
  grid: boolean[][];
};

export class GameOfLife {
  board: GameBoard;

  constructor(board: GameBoard) {
    this.board = board;
  }

  private countAliveNeighbors(row: number, column: number) {
    let aliveCount = 0;

    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = column + dy;

      if (newRow >= 0 && newRow < this.board.height && newCol >= 0 && newCol < this.board.width) {
        if (this.board.grid[newRow][newCol] === true) {
          aliveCount++;
        }
      }
    }

    return aliveCount;
  }

  private trimGrid(grid: boolean[][]): boolean[][] {
    if (!grid.length || !grid[0].length) return [];

    let top = 0,
      bottom = grid.length - 1;
    let left = 0,
      right = grid[0].length - 1;

    while (top <= bottom && grid[top].every((cell) => !cell)) top++;
    while (bottom >= top && grid[bottom].every((cell) => !cell)) bottom--;
    while (left <= right && grid.every((row) => !row[left])) left++;
    while (right >= left && grid.every((row) => !row[right])) right--;

    if (top > bottom || left > right) return [];

    return grid.slice(top, bottom + 1).map((row) => row.slice(left, right + 1));
  }

  tick() {
    const newGrid = [
      new Array(this.board.grid[0].length + 2).fill(false),
      ...this.board.grid.map((row) => [false, ...row, false]),
      new Array(this.board.grid[0].length + 2).fill(false),
    ];

    this.board.grid = [
      new Array(this.board.grid[0].length + 2).fill(false),
      ...this.board.grid.map((row) => [false, ...row, false]),
      new Array(this.board.grid[0].length + 2).fill(false),
    ];

    this.board.height = newGrid.length;
    this.board.width = newGrid[0].length;

    for (let row = 0; row < this.board.grid.length; row++) {
      for (let col = 0; col < this.board.grid[row].length; col++) {
        const aliveNeighbors = this.countAliveNeighbors(row, col);

        if (aliveNeighbors < 2) {
          newGrid[row][col] = false;
        }

        if (aliveNeighbors > 3) {
          newGrid[row][col] = false;
        }

        if (aliveNeighbors === 3) {
          newGrid[row][col] = true;
        }
      }
    }

    const trimmedGrid = this.trimGrid(newGrid);
    this.board.grid = trimmedGrid;

    this.board.height = trimmedGrid.length;
    this.board.width = trimmedGrid[0].length;
  }
}
