import { afterEach, beforeEach, beforeAll, afterAll, describe, test } from "vitest";
import { expect } from "chai";
import { PasswordHasher, PasswordService, PostgresUserDao } from "../src/testable4.mjs";

import pg from "pg";

import util from "node:util";
import child_process from "node:child_process";

import { readFileSync } from "fs";

const exec = util.promisify(child_process.exec);

// I used the code for the docker connection from the reference solution.
async function dockerComposePort(service, privatePort) {
  const result = await exec(`docker compose port ${service} ${privatePort}`);
  const [host, port] = result.stdout.trim().split(":");
  return { host, port };
}

async function dockerComposeEnv(service) {
  const ps = await exec(`docker compose ps --quiet ${service}`);
  const containerId = ps.stdout.trim();

  const inspect = await exec(`docker inspect ${containerId}`);
  const env = JSON.parse(inspect.stdout)[0].Config.Env;
  return env
    .map((s) => s.split("="))
    .reduce((m, [k, v]) => {
      m[k] = v;
      return m;
    }, {});
}

async function connectTestDb() {
  const service = "db";
  const privatePort = "5432";
  const { host, port } = await dockerComposePort(service, privatePort);
  const env = await dockerComposeEnv(service);
  return new pg.Pool({
    host,
    port,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_USER,
  });
}

async function createTables(db) {
  await db.query(readFileSync("./src/create-tables.sql", { encoding: "utf8", flag: "r" }));
}

async function dropTables(db) {
  await db.query(readFileSync("./src/drop-tables.sql", { encoding: "utf8", flag: "r" }));
}

describe("Enterprise application", () => {
  let db;
  let dao;
  let passwordService;

  const testPassword = "testPassword123";
  const testHasher = new PasswordHasher();
  const testUserId = 123;
  const testPasswordHash = testHasher.hashPassword(testPassword);

  const newUser = { userId: testUserId, passwordHash: testPasswordHash };

  describe("Password hasher", () => {
    test("can verify right password", async () => {
      expect(testHasher.verifyPassword(testPasswordHash, testPassword)).to.be.true;
    });

    test("declines wrong password", async () => {
      expect(testHasher.verifyPassword(testPasswordHash, "wrongPassword123")).to.be.false;
    });
  });

  beforeAll(async () => {
    db = await connectTestDb();

    await dropTables(db);
    await createTables(db);

    dao = new PostgresUserDao(db);

    await dao.save(newUser);
    passwordService = new PasswordService(dao, testHasher);
  });

  test("can get created user", async () => {
    expect((await dao.getById(newUser.userId)).userId).to.equal(123);
  });

  describe("Password services", () => {
    test("can change password", async () => {
      const newPassword = "newPassword123";

      await passwordService.changePassword(testUserId, testPassword, newPassword);
      const currentUser = await dao.getById(testUserId);

      expect(testHasher.verifyPassword(currentUser.passwordHash, newPassword)).to.be.true;
    });

    test("throws error for wrong old password", async () => {
      const newPassword = "newPassword123";

      let error;
      try {
        await passwordService.changePassword(testUserId, "wrongPassword123", newPassword);
      } catch (e) {
        error = e;
      }
      expect(error).to.deep.equal(new Error("wrong old password"));
    });
  });

  afterAll(async () => {
    await db.end();
  });
});
