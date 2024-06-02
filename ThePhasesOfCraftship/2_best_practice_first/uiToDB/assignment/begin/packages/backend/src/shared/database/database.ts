import { PrismaClient } from "@prisma/client";
import { generateRandomPassword } from "../utils";
import { CreateUserCommand } from "@dddforum/backend/src/modules/users";
import { User } from "@dddforum/shared/src/api/users";

export interface UsersPersistence {
  save(user: CreateUserCommand): Promise<User & { password: string }>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserByUsername(username: string): Promise<User | null>;
}

export class Database {
  public users: UsersPersistence;
  private connection: PrismaClient;

  constructor() {
    this.connection = new PrismaClient();
    this.users = this.buildUsersPersistence();
  }

  getConnection() {
    return this.connection;
  }

  async connect() {
    await this.connection.$connect();
  }

  private buildUsersPersistence(): UsersPersistence {
    return {
      save: this.saveUser.bind(this),
      findUserByEmail: this.findUserByEmail.bind(this),
      findUserByUsername: this.findUserByUsername.bind(this),
    };
  }

  private async saveUser(user: CreateUserCommand) {
    const { email, firstName, lastName, username } = user;
    return await this.connection.$transaction(async () => {
      const user = await this.connection.user.create({
        data: {
          email,
          username,
          firstName,
          lastName,
          password: generateRandomPassword(10),
        },
      });
      await this.connection.member.create({
        data: { userId: user.id },
      });

      return user;
    });
  }

  private async findUserByEmail(email: string) {
    return this.connection.user.findFirst({ where: { email } });
  }

  private async findUserByUsername(username: string) {
    return this.connection.user.findFirst({ where: { username } });
  }
}
