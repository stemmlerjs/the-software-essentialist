import { CreateUserCommandBuilder } from "./createUserCommandBuilder";
import { ValidatedUserBuilder } from "./validatedUserBuilder";

export class UserBuilder {
  
  makeCreateUserCommandBuilder () {
    return new CreateUserCommandBuilder()
  }

  makeValidatedUserBuilder () {
    return new ValidatedUserBuilder ();
  }
}
