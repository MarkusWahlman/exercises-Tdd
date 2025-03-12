import { GameBoard } from "./GameOfLife";

function parseRleHeaderLine(headerLine: string, gameBoard: GameBoard): GameBoard {
  if (headerLine.length <= 0) {
    throw new Error("Empty header line");
  }

  const variables = headerLine.split(",");

  for (let j = 0; j < variables.length; j++) {
    const varValue = variables[j].split("=");
    if (varValue.length !== 2) {
      throw new Error("Invalid header line");
    }
    const leftSide = varValue[0].trim();
    const rightSide = varValue[1].trim();

    if (leftSide === "x") {
      if (isNaN(Number(rightSide))) {
        throw new Error("Variable x should be a number");
      }
      gameBoard.width = Number(rightSide);
    } else if (leftSide === "y") {
      if (isNaN(Number(rightSide))) {
        throw new Error("Variable y should be a number");
      }
      gameBoard.height = Number(rightSide);
    } else if (leftSide === "rule") {
      /*B3/S23 stands for Game of Life rules*/
      if (rightSide !== "B3/S23") {
        throw new Error("Invalid rule");
      }
      gameBoard.rule = rightSide;
    } else {
      throw new Error("Invalid header line variable name");
    }
  }

  return gameBoard;
}

export function rleToBoardParser(dataString: string): GameBoard {
  const lines = dataString.split("\n");

  let gameBoard: GameBoard = {
    width: 0,
    height: 0,
    rule: "",
    grid: [],
  };

  let curIndex;
  for (curIndex = 0; curIndex < lines.length; curIndex++) {
    lines[curIndex] = lines[curIndex].trim();

    if (lines[curIndex][0] === "#") {
      continue;
    }

    gameBoard = parseRleHeaderLine(lines[curIndex], gameBoard);
    break;
  }

  if (!gameBoard.width || !gameBoard.height) {
    throw new Error("Insufficient header line");
  }

  let pattern = "";
  for (curIndex = curIndex + 1; curIndex < lines.length; curIndex++) {
    if (lines[curIndex].search("!") > 0) {
      pattern += lines[curIndex].split("!")[0];
      pattern = pattern.trim();

      break;
    }

    if (curIndex === lines.length - 1) {
      throw new Error("Pattern has no end");
    }

    pattern += lines[curIndex];
  }

  const patternLines = pattern.split("$");

  for (let i = 0; i < patternLines.length; ++i) {
    let currentRow: boolean[] = [];

    let runCount = 1;
    let countChanged = false;
    for (const char of patternLines[i]) {
      if (!isNaN(Number(char))) {
        if (countChanged) {
          runCount = Number(`${runCount}${char}`);
        } else {
          runCount = Number(char);
        }
        countChanged = true;
        continue;
      }

      if (char === "o") {
        currentRow.push(...Array(runCount).fill(true));
      } else if (char === "b") {
        currentRow.push(...Array(runCount).fill(false));
      } else {
        throw new Error("Invalid pattern character");
      }
      runCount = 1;
      countChanged = false;
    }

    if (currentRow.length < gameBoard.width) {
      currentRow.push(...Array(gameBoard.width - currentRow.length).fill(false));
    }

    if (currentRow.length > gameBoard.width) {
      throw new Error("Pattern length more than width");
    }

    gameBoard.grid.push(currentRow);
  }

  return gameBoard;
}

export function boardToRleParser(board: GameBoard) {
  let headerLine = `x = ${board.width}, y = ${board.height}`;
  if (board.rule != "") {
    headerLine = headerLine.concat(`, rule = ${board.rule}`);
  }
  if (!board.grid || board.grid.length <= 0) {
    return headerLine;
  }

  let pattern = "";
  for (let row = 0; row < board.grid.length; row++) {
    for (let col = 0; col < board.grid[row].length; col++) {
      if (board.grid[row][col] === true) {
        pattern = pattern.concat("o");
      }
      if (board.grid[row][col] === false) {
        pattern = pattern.concat("b");
      }
    }
    if (row === board.grid.length - 1) {
      pattern = pattern.concat("!");
    } else {
      pattern = pattern.concat("$");
    }
  }
  pattern = pattern.replace(/b+(?=[$!])/g, "");
  pattern = pattern.replace(/([ob])\1*/g, (match, char) => (match.length > 1 ? match.length + char : char));

  return `${headerLine}\n${pattern}`;
}
