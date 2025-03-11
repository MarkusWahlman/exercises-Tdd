type GameBoard = {
  width: number;
  height: number;
  rule: string;
  board: boolean[][];
};

function parseHeaderLine(headerLine: string, gameBoard: GameBoard): GameBoard {
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

export function rleParser(dataString: string): GameBoard {
  const lines = dataString.split("\n");

  let gameBoard: GameBoard = {
    width: 0,
    height: 0,
    rule: "",
    board: [],
  };

  let curIndex;
  for (curIndex = 0; curIndex < lines.length; curIndex++) {
    lines[curIndex] = lines[curIndex].trim();

    if (lines[curIndex][0] === "#") {
      continue;
    }

    gameBoard = parseHeaderLine(lines[curIndex], gameBoard);
    break;
  }

  if (!gameBoard.width || !gameBoard.height) {
    throw new Error("Insufficient header line");
  }

  let pattern = "";
  for (curIndex = curIndex + 1; curIndex < lines.length; curIndex++) {
    if (lines[curIndex].search("!") > 0) {
      pattern += lines[curIndex].split("!")[0];
      break;
    }

    pattern += lines[curIndex];
  }
  pattern = pattern.trim();

  const patternLines = pattern.split("$");

  for (let i = 0; i < patternLines.length; ++i) {
    let currentRow: boolean[] = [];

    let runCount = 1;
    for (const char of patternLines[i]) {
      if (!isNaN(Number(char))) {
        runCount = Number(char);
        continue;
      }

      if (char === "o") {
        currentRow.push(...Array(runCount).fill(true));
        runCount = 1;
      } else if (char === "b") {
        currentRow.push(...Array(runCount).fill(false));
        runCount = 1;
      } else {
        throw new Error("Invalid pattern character");
      }
    }
    gameBoard.board.push(currentRow);
  }

  return gameBoard;
}
