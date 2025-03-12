
import { Config } from '@dddforum/config';
import { PrismaClient } from '@prisma/client'

export interface Database {
  getConnection(): PrismaClient
  connect(): Promise<void>;
}

export class PrismaDatabase implements Database {
  private connection: PrismaClient;

  constructor(config: Config) {
    this.connection = new PrismaClient({
      datasources: {
        db: {
          url: config.database.connectionString, // e.g. "postgresql://user:pass@host:5432/dbname"
        },
      },
    });
  }

  getConnection(): PrismaClient {
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
