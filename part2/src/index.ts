import { Board } from "./Board.js";
import { ScoringSystem } from "./ScoringSystem.js";
import { ShuffleBag } from "./ShuffleBag.js";
import { Tetromino } from "./Tetromino.js";

class Game {
  columns: number;
  rows: number;
  tickDuration: number;
  nextTick: number;

  board: Board;
  scoring: ScoringSystem;
  tetrominoes: ShuffleBag<Tetromino>;

  constructor(columns = 10, rows = 20, tickDuration = 1000) {
    this.columns = columns;
    this.rows = rows;
    this.tickDuration = tickDuration;
    this.nextTick = 0;

    this.scoring = new ScoringSystem();
    this.board = new Board(this.columns, this.rows);
    this.tetrominoes = new ShuffleBag([
      Tetromino.I_SHAPE,
      Tetromino.T_SHAPE,
      Tetromino.L_SHAPE,
      Tetromino.J_SHAPE,
      Tetromino.S_SHAPE,
      Tetromino.Z_SHAPE,
      Tetromino.O_SHAPE,
    ]);

    this.board.onClearLine = (lineCount) => {
      this.scoring.linesCleared(lineCount);
    };
  }
}

function initGame() {
  const canvas = document.getElementById("game") as HTMLCanvasElement;

  const game = new Game();

  game.scoring = new ScoringSystem();
  game.board = new Board(game.columns, game.rows);
  game.board.onClearLine = (lineCount) => {
    game.scoring?.linesCleared(lineCount);
  };
  game.tetrominoes = new ShuffleBag([
    Tetromino.I_SHAPE,
    Tetromino.T_SHAPE,
    Tetromino.L_SHAPE,
    Tetromino.J_SHAPE,
    Tetromino.S_SHAPE,
    Tetromino.Z_SHAPE,
    Tetromino.O_SHAPE,
  ]);

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      for (let i = 0; i < game.rows; i++) {
        game.board.moveDown();
      }
    } else if (event.key === "z") {
      game.board.rotateLeft();
    } else if (event.key === "x") {
      game.board.rotateRight();
    } else if (event.code === "ArrowUp") {
      game.board.rotateRight();
    } else if (event.code === "ArrowDown") {
      game.board.moveDown();
    } else if (event.code === "ArrowLeft") {
      game.board.moveLeft();
    } else if (event.code === "ArrowRight") {
      game.board.moveRight();
    } else {
      return;
    }
    event.preventDefault(); // prevent game keys from scrolling the window
  });

  const render = (timestamp: number) => {
    progressTime(game, timestamp);
    renderGame(game, canvas, timestamp);
    window.requestAnimationFrame(render);
  };
  window.requestAnimationFrame(render);
}

// game logic

function progressTime(game: Game, timestamp: number) {
  if (timestamp >= game.nextTick) {
    tick(game);
    adjustDifficulty(game);
    game.nextTick = timestamp + game.tickDuration;
  }
}

function tick(game: Game) {
  game.board.tick();
  if (!game.board.hasFalling()) {
    game.board.drop(game.tetrominoes.next());
  }
}

function adjustDifficulty(game: Game) {
  const tickDuration = TICK_DURATION_PER_LEVEL[game.scoring.level];
  if (tickDuration) {
    game.tickDuration = tickDuration;
  }
}

const TICK_DURATION_PER_LEVEL: { [level: number]: number } = {
  1: 33 * 15,
  2: 33 * 13,
  3: 33 * 11,
  4: 33 * 9,
  5: 33 * 7,
  6: 33 * 5,
  7: 33 * 4,
  8: 33 * 3,
  9: 33 * 2,
  10: 33,
};

// rendering

function renderGame(game: Game, canvas: HTMLCanvasElement, timestamp: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("No ctx");
    return;
  }
  const canvasWidth = (canvas.width = canvas.clientWidth);
  const canvasHeight = (canvas.height = canvas.clientHeight);
  const cellWidth = canvasWidth / game.columns;
  const cellHeight = canvasHeight / game.rows;

  drawBackground(ctx, canvasWidth, canvasHeight);
  for (let row = 0; row < game.rows; row++) {
    for (let column = 0; column < game.columns; column++) {
      const cell = game.board.cellAt(row, column);
      drawCell(ctx, { cell, row, column, cellWidth, cellHeight });
    }
  }
  drawScoring(ctx, {
    level: game.scoring.level,
    score: game.scoring.score,
    canvasWidth,
  });
}

function drawBackground(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawCell(
  ctx: CanvasRenderingContext2D,
  {
    cell,
    row,
    column,
    cellWidth,
    cellHeight,
  }: { cell: string; row: number; column: number; cellWidth: number; cellHeight: number }
) {
  ctx.fillStyle = CELL_COLORS[cell];
  const x = cellWidth * column;
  const y = cellHeight * row;
  ctx.fillRect(x, y, cellWidth, cellHeight);
}

const CELL_COLORS: { [key: string]: string } = {
  ".": "#ffffff",
  I: "#cc1c19",
  T: "#3a88b2",
  L: "#c85c14",
  J: "#312cc3",
  S: "#921392",
  Z: "#2e9915",
  O: "#9a8016",
};

function drawScoring(
  ctx: CanvasRenderingContext2D,
  { score, level, canvasWidth }: { score: number; level: number; canvasWidth: number }
) {
  const margin = 5;
  const fontSize = 22;
  drawText(ctx, {
    text: `Level ${level}`,
    x: margin,
    y: fontSize + margin,
    font: `${fontSize}px sans-serif`,
  });
  drawText(ctx, {
    text: `Score ${score}`,
    textAlign: "right",
    x: canvasWidth - margin,
    y: fontSize + margin,
    font: `${fontSize}px sans-serif`,
  });
}

function drawText(
  ctx: CanvasRenderingContext2D,
  { text, x, y, font, textAlign }: { text: string; x: number; y: number; font: string; textAlign?: CanvasTextAlign }
) {
  ctx.font = font;
  ctx.textAlign = textAlign || "left";
  ctx.fillStyle = "#000000";
  ctx.fillText(text, x, y);
}

initGame();
