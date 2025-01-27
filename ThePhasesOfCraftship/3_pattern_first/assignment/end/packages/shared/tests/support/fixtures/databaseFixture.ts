import { generateRandomPassword } from "@dddforum/backend/src/shared/utils";
import { CreateUserParams } from "@dddforum/shared/src/api/users";
import { CreateUserCommand } from "@dddforum/backend/src/modules/users/usersCommand";
import { CompositionRoot } from "@dddforum/backend/src/shared/compositionRoot";

export class DatabaseFixture {
  constructor(private composition: CompositionRoot) {
  }

  async resetDatabase() {
    const connection = this.composition.getDatabase().getConnection();

    try {
      await connection.$transaction([
        connection.comment.deleteMany(),
        connection.vote.deleteMany(),
        connection.post.deleteMany(),
        connection.member.deleteMany(),
        connection.user.deleteMany(),
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      await connection.$disconnect();
    }
  }

  async setupWithExistingUsers(createUserParams: CreateUserParams[]) {
    const connection = this.composition.getDatabase().getConnection();
    await connection.$transaction(
      createUserParams.map((user) => {
        return connection.user.create({
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

  async setupWithExistingUsersFromCommands(commands: CreateUserCommand[]) {
    const application = this.composition.getApplication()
    for (let command of commands) {
      await application.users.deleteUser(command.email);
    }

    for (let command of commands) {
      await application.users.createUser(command);
    }
  }
}
