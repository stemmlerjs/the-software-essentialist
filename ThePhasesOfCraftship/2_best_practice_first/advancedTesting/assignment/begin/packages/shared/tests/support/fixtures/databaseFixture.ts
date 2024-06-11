import { PrismaClient } from "@prisma/client";
import { generateRandomPassword } from "@dddforum/backend/src/shared/utils";
import { CreateUserParams } from "@dddforum/shared/src/api/users";
import { Database } from "@dddforum/backend/src/shared/database";

export class DatabaseFixture {
  private connection: PrismaClient;
  constructor() {
    this.connection = new Database().getConnection();
  }

  async resetDatabase() {
    const deleteAllComments = this.connection.comment.deleteMany();
    const deleteAllVotes = this.connection.vote.deleteMany();
    const deleteAllPosts = this.connection.post.deleteMany();
    const deleteMembers = this.connection.member.deleteMany();
    const deleteAllUsers = this.connection.user.deleteMany();

    try {
      await this.connection.$transaction([
        deleteAllComments,
        deleteAllVotes,
        deleteAllPosts,
        deleteMembers,
        deleteAllUsers,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      await this.connection.$disconnect();
    }
  }

  async setupWithExistingUsers(createUserParams: CreateUserParams[]) {
    await this.connection.$transaction(
      createUserParams.map((user) => {
        return this.connection.user.create({
          data: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: generateRandomPassword(10),
          },
        });
      }),
    );
  }
}
