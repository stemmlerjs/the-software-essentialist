import { DatabaseConnection } from "../ports/databaseConnection";
import { PrismaClient } from '@prisma/client';

export class PrismaDBConnection implements DatabaseConnection {
  private client: PrismaClient;

  constructor () {
    this.client = new PrismaClient()
  }
  
  async connect(): Promise<void> {
    await this.client.$connect();
    console.log('Prisma connected successfully!');
    // Perform database operations or further tests here
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
    console.log('Prisma disconnected.');
  }
}




;

// async function getUsers() {
//   const users = await prisma.user.findMany();
//   console.log(users);
// }

// getUsers()
//   .catch((error) => {
//     console.error(error);
//   })
//   .finally(() => {
//     prisma.$disconnect();
//   });

