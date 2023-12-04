import { CompositionRoot } from "@dddforum/backend/src/shared/composition/compositionRoot";
import { CreateUserCommand } from "@dddforum/shared/src/api/users";

export class DatabaseFixture {

  constructor (private compositionRoot: CompositionRoot) {
    
  }

  async setupWithExistingUser (command: CreateUserCommand) {
    let userService = this.compositionRoot.getUserService();
    
    await userService.deleteUser(command.email);
    await userService.createUser(command);
  }

  
}