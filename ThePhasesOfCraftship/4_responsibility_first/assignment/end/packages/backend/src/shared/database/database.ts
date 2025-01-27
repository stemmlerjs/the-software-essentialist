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
    await this.connection.$connect();
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
