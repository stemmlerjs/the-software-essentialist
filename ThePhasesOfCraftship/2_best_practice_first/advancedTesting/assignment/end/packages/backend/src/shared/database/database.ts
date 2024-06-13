import { PrismaClient } from "@prisma/client";
import { User } from "@dddforum/shared/src/api/users";
import { Post } from "@dddforum/shared/src/api/posts";
import { CreateUserCommand } from "../../modules/users/usersCommand";

export interface UsersPersistence {
  save(user: CreateUserCommand): Promise<User & { password: string }>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserByUsername(username: string): Promise<User | null>;
}

export interface PostsPersistence {
  findPosts(sort: string): Promise<Post[]>;
}

export class Database {
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
