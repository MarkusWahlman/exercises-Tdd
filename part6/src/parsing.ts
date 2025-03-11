type RleData = {
  headerLine: string;
  headerLineX?: number;
  headerLineY?: number;
  headerLineRule?: string;
};

export function rleParser(dataString: string): RleData {
  const lines = dataString.split("\n");

  let rleData: RleData = {
    headerLine: "",
  };

  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].trim();

    if (lines[i][0] === "#") {
      continue;
    }

    if (rleData.headerLine === "") {
      if (lines[i].length <= 0) {
        throw new Error("Empty header line");
      }

      const variables = lines[i].split(",");

      for (let j = 0; j < variables.length; j++) {
        const varValue = variables[j].split("=");
        if (varValue.length != 2) {
          throw new Error("Invalid header line");
        }
        const leftSide = varValue[0].trim();
        const rightSide = varValue[1].trim();

        if (leftSide === "x") {
          if (isNaN(Number(rightSide))) {
            throw new Error("Variable x should be a number");
          }
        } else if (leftSide === "y") {
          if (isNaN(Number(rightSide))) {
            throw new Error("Variable y should be a number");
          }
        } else if (leftSide === "rule") {
          //save rule?
        } else {
          throw new Error("Invalid header line variable name");
        }
      }

      rleData.headerLine = lines[i];
    }
  }

  return rleData;
}
