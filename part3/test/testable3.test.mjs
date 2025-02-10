import { describe, test, beforeEach } from "vitest";
import { expect } from "chai";
import fs from "fs";
import { parseCsvData, readCsvFile, transformPeopleData, parsePeopleCsv } from "../src/testable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

const filePath = "test/peopleDummy.csv";
const csvContent = `Loid,Forger,,Male
Anya,Forger,6,Female
Yor,Forger,27,Female`;

const parsedCsvContent = [
  ["Loid", "Forger", "", "Male"],
  ["Anya", "Forger", "6", "Female"],
  ["Yor", "Forger", "27", "Female"],
];

const transformedCsvContent = [
  { firstName: "Loid", lastName: "Forger", gender: "m" },
  { firstName: "Anya", lastName: "Forger", age: 6, gender: "f" },
  { firstName: "Yor", lastName: "Forger", age: 27, gender: "f" },
];

describe("File reading", () => {
  test("returns valid file data", async () => {
    try {
      expect(await readCsvFile(filePath)).to.deep.equal(csvContent);
    } catch (e) {
      throw e;
    }
  });
});

describe("CSV Parsing", () => {
  test("returns valid file data", async () => {
    expect(await parseCsvData(csvContent)).to.deep.equal(parsedCsvContent);
  });
});

describe("Transform people data", () => {
  test("returns valid file data", async () => {
    expect(await transformPeopleData(parsedCsvContent)).to.deep.equal(transformedCsvContent);
  });
});

describe("Parse people CSV", () => {
  beforeEach(() => {
    fs.writeFileSync(filePath, csvContent);
  });
  test("correctly parses and transforms data", async () => {
    const data = await parsePeopleCsv(filePath);
    expect(data).to.deep.equal(transformedCsvContent);
  });
});
