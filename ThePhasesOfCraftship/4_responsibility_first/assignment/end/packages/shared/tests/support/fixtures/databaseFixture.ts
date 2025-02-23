

import { CreateUserParams } from "@dddforum/shared/src/api/users";
import { CreateUserCommand } from "@dddforum/backend/src/modules/users/usersCommand";
import { CompositionRoot } from "@dddforum/backend/src/shared/compositionRoot";
import { Member } from "@dddforum/backend/src/modules/members/domain/member";
import { MembersModule } from "@dddforum/backend/src/modules/members/membersModule";

export class DatabaseFixture {
  constructor(private composition: CompositionRoot) {
  }

  async resetDatabase() {
    const connection = this.composition.getDatabase().getConnection();

    try {
      await connection.$transaction([
        connection.postVote.deleteMany(),
        connection.commentVote.deleteMany(),
        connection.comment.deleteMany(),
        connection.post.deleteMany(),
        connection.member.deleteMany(),
        // connection.user.deleteMany(),
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      await connection.$disconnect();
    }
  }

  async setupWithExistingMembers (members: Member[]) {
    const membersModule = (this.composition.getModule('members') as MembersModule);
    const membersRepo = membersModule.getMembersRepository();
    await Promise.all(members.map((member) => membersRepo.save(member)));
  }

  // Deprecated (auth/identity is moving to an external service)
  async setupWithExistingUsers(createUserParams: CreateUserParams[]) {
    const connection = this.composition.getDatabase().getConnection();
    // TODO: Cleanup
    // await connection.$transaction(
    //   createUserParams.map((user) => {
    //     return connection.user.create({
    //       data: {
    //         email: user.email,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         password: generateRandomPassword(10),
    //       },
    //     });
    //   }),
    // );
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
