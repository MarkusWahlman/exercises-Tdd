import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

export async function readCsvFile(filePath) {
  const csvData = await readFile(filePath, { encoding: "utf8" });
  return csvData;
}

export async function parseCsvData(csvData) {
  return parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });
}

export function transformPeopleData(records) {
  return records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender.charAt(0).toLowerCase(),
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });
}

export async function parsePeopleCsv(filePath) {
  const csvData = await readCsvFile(filePath);
  const records = await parseCsvData(csvData);
  return transformPeopleData(records);
}
