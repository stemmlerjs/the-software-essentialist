
import { PrismaClient } from "@prisma/client";
import { CreateUserCommand } from "@dddforum/shared/src/api/users";
import { TextUtil } from "@dddforum/shared/src/utils/textUtil";

export class DatabaseFixture {
  private connection: PrismaClient;
  constructor() {
    this.connection = new PrismaClient()
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

  async setupWithExistingUsers(createUserParams: CreateUserCommand[]) {
    await this.connection.$transaction(
      createUserParams.map((user) => {
        return this.connection.user.create({
          data: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: TextUtil.createRandomText(10)
          },
        });
      }),
    );
  }
}
