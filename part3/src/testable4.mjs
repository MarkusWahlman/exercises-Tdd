import argon2 from "@node-rs/argon2";
import pg from "pg";

export class PostgresUserDao {
  db;

  constructor(
    db = new pg.Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    }),
  ) {
    this.db = db;
  }

  close() {
    this.db.end();
  }

  #rowToUser(row) {
    return { userId: row.user_id, passwordHash: row.password_hash };
  }

  async getById(userId) {
    const { rows } = await this.db.query(
      `select user_id, password_hash
       from users
       where user_id = $1`,
      [userId],
    );
    return rows.map(this.#rowToUser)[0] || null;
  }

  async save(user) {
    await this.db.query(
      `insert into users (user_id, password_hash)
       values ($1, $2)
       on conflict (user_id) do update
           set password_hash = excluded.password_hash`,
      [user.userId, user.passwordHash],
    );
  }
}

export class PasswordHasher {
  hashPassword(password) {
    return argon2.hashSync(password);
  }

  verifyPassword(hash, password) {
    return argon2.verifySync(hash, password);
  }
}

export class PasswordService {
  dao;
  hasher;

  constructor(dao, hasher) {
    this.dao = dao;
    this.hasher = hasher;
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.dao.getById(userId);
    if (!this.hasher.verifyPassword(user.passwordHash, oldPassword)) {
      throw new Error("wrong old password");
    }
    user.passwordHash = this.hasher.hashPassword(newPassword);
    await this.dao.save(user);
  }
}
