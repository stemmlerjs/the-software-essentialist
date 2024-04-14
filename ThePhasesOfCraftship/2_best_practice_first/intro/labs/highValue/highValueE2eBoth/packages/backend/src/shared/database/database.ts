import { PrismaClient } from "@prisma/client"

export class DBConnection {
  private connection: PrismaClient;

  constructor () {
    this.connection = new PrismaClient()
  }

  getConnection () {
    return this.connection;
  }

  async connect () {
    await this.connection.$connect()
  }
}