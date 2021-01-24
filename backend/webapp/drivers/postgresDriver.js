const { Client } = require("pg");

class PostgresDriver {
  constructor() {}

  async initialise() {
    this.client = new Client({
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_DB,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
    });
    await this.client.connect();
  }

  async query(queryString, variables) {
    return await new Promise((resolve, reject) => {
      this.client.query(queryString, variables, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  disconnect() {
    this.client.end();
  }
}

const postgresDriver = new PostgresDriver();

module.exports = postgresDriver;
