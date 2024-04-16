
import { CompositionRoot } from "@dddforum/backend/src/shared/composition/compositionRoot";
import { CreateUserCommand } from "@dddforum/shared/src/api/users";

export class DatabaseFixture {

  constructor (private compositionRoot: CompositionRoot) {
    
  }

  async setupWithExistingUsers (commands: CreateUserCommand[]) {
    const userService = this.compositionRoot.getUserService();
    
    for (let command of commands) {
      await userService.deleteUser(command.email);
    }

    for (let command of commands) {
      await userService.createUser(command);
    }
  }
  
}