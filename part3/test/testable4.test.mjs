import { afterEach, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao } from "../src/testable4.mjs";

describe.skip("Enterprise application", () => {
  let users;
  let service;
  const userId = 1;
  beforeEach(() => {
    users = new PostgresUserDao();
    service = new PasswordService(users, hasher);
  });

  afterEach(() => {
    PostgresUserDao.getInstance().close();
  });

  test("todo", async () => {
    // TODO: write proper tests for both PasswordService and PostgresUserDao
  });
});
