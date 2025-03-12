import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { GameBoard, GameOfLife } from "../src/GameOfLife";
import { rleToBoardParser } from "../src/parsing";

describe("Game of life", () => {
  let gliderBoard: GameBoard;
  let gliderGame: GameOfLife;
  beforeEach(() => {
    const data = `x = 3, y = 3, rule = B3/S23
    bob$2bo$3o!`;
    gliderBoard = rleToBoardParser(data);
    gliderGame = new GameOfLife(gliderBoard);
  });

  test("starts with the given game board", () => {
    expect(gliderGame.board).to.equal(gliderBoard);
  });

  test("any live cell with fewer than two live neighbours dies on tick", () => {
    gliderGame.tick();
    expect(gliderGame.board.grid[0][1]).to.equal(false);
  });

  test("any live cell with more than three live neighbours dies on tick", () => {
    const data = `x = 3, y = 3, rule = B3/S23
  obo$b2o$bo!
  `;
    const game = new GameOfLife(rleToBoardParser(data));
    game.tick();

    expect(game.board.grid[1][1]).to.equal(false);
  });

  test("any live cell with two or three live neighbours lives on to the next generation", () => {
    gliderGame.tick();
    expect(gliderGame.board.grid[0][2]).to.equal(true);
    expect(gliderGame.board.grid[1][1]).to.equal(true);
    expect(gliderGame.board.grid[1][2]).to.equal(true);
  });

  test("any dead cell with exactly three live neighbours becomes a live cell", () => {
    gliderGame.tick();
    expect(gliderGame.board.grid[0][0]).to.equal(true);
    expect(gliderGame.board.grid[2][1]).to.equal(true);
  });

  test("the game board can expand in height", () => {
    const data = `x = 36, y = 9, rule = B3/S23
  27bo$26b4o$9b2o14b2obobo3b2o$bo7bo2bo11b3obo2bo2b2o$o3b2o7bo11b2obobo
  $o5bo6bo12b4o$b5o7bo7bo5bo$9bo2bo9bo$9b2o9b3o!
    `;
    const game = new GameOfLife(rleToBoardParser(data));
    game.tick();
    expect(game.board.height).to.equal(10);
  });

  test("the game board can expand in width", () => {
    const data = `x = 36, y = 23, rule = B3/S23
24bo$24b4o$8bo16b4o5b2o$7bobo5b2o8bo2bo5b2o$2o3b2o3bo14b4o$2o3b2o3bo4b
obob2o3b4o$5b2o3bo5b2o3bo2bo$7bobo10bo$8bo8bo2bo4$27bo$28bo$26b3o6$35b
o$33bobo$34b2o!
  `;
    const game = new GameOfLife(rleToBoardParser(data));
    game.tick();

    expect(game.board.width).to.equal(37);
  });
});
