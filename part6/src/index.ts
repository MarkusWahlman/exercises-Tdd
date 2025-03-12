import readline from "readline";
import { readFile } from "node:fs/promises";
import { boardToRleParser, rleToBoardParser } from "./parsing.js";
import { GameOfLife } from "./GameOfLife.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askInput() {
  rl.question(`Enter file name or path or "exit" to exit: `, async (filePath) => {
    if (filePath === "exit") {
      rl.close();
      return;
    }
    try {
      const fileData = await readFile(filePath, { encoding: "utf8" });
      const board = rleToBoardParser(fileData);
      const game = new GameOfLife(board);
      rl.question("Number of generations to simulate: ", async (genCount) => {
        if (isNaN(Number(genCount))) {
          askInput();
          return;
        }

        for (let i = 0; i < Number(genCount); ++i) {
          game.tick();
        }

        console.log(boardToRleParser(game.board));
        askInput();
      });
    } catch {
      askInput();
      return;
    }
  });
}

console.log("Conway's Game of Life");
askInput();
