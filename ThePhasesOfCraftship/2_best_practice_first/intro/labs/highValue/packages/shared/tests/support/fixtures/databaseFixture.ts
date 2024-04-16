import { CompositionRoot } from "@dddforum/backend/src/shared/composition/compositionRoot";
import { CreateUserCommand } from "@dddforum/shared/src/api/users";

export class DatabaseFixture {

  constructor (private compositionRoot: CompositionRoot) {
    
  }

  async setupWithExistingUsers (commands: CreateUserCommand[]) {
    const database = this.compositionRoot.getDatabase();
    const userService = this.compositionRoot.getUserService();
    
    for (let command of commands) {
      await database.users.delete(command.email);
    }

    for (let command of commands) {
      await userService.createUser(command);
    }
  }
  
}