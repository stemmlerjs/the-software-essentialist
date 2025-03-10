import { ServerError } from "@dddforum/shared/src/errors";

// TODO: Remove
// import { CustomException } from "../../shared/exceptions";

class EmailAlreadyInUseException extends ServerError {
  constructor(email: string) {
    super(`Email ${email} is already in use`);
  }
}

class UsernameAlreadyTakenException extends ServerError {
  constructor(username: string) {
    super(
      `Username ${username} is already taken`,
    );
  }
}

class UserNotFoundException extends ServerError {
  constructor(email: string) {
    super(`User with email ${email} not found`);
  }
}

export {
  EmailAlreadyInUseException,
  UsernameAlreadyTakenException,
  UserNotFoundException,
};
