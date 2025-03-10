import { PrismaClient } from "@prisma/client";

export interface Database {
  getConnection(): PrismaClient
  connect(): Promise<void>;
}

export class PrismaDatabase implements Database {
  private connection: PrismaClient;

  constructor() {
    this.connection = new PrismaClient();
  }

  getConnection() {
    return this.connection;
  }

  async connect() {
    console.log('Starting the database connection...')
    await this.connection.$connect();
    await this.connection.$queryRaw`SELECT 1 + 1 AS result`;
    console.log('Connected to the prisma database')
  }
}

export class FakeDatabase implements Database {
  constructor() {}

  getConnection() {
    return {} as PrismaClient;
  }

  async connect() {
    return Promise.resolve();
  }
}
