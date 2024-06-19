import { CustomException } from "../../shared/exceptions";

class EmailAlreadyInUseException extends CustomException {
  constructor(email: string) {
    super(`Email ${email} is already in use`, "EmailAlreadyInUseException");
  }
}

class UsernameAlreadyTakenException extends CustomException {
  constructor(username: string) {
    super(
      `Username ${username} is already taken`,
      "UsernameAlreadyTakenException",
    );
  }
}

class UserNotFoundException extends CustomException {
  constructor(email: string) {
    super(`User with email ${email} not found`, "UserNotFoundException");
  }
}

export {
  EmailAlreadyInUseException,
  UsernameAlreadyTakenException,
  UserNotFoundException,
};
