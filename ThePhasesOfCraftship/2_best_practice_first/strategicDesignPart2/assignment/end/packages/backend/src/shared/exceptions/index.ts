export class CustomException extends Error {
  public type: string;
  constructor(message: string, type: string = "CustomException") {
    super(message);
    this.type = type;
  }
}

class InvalidRequestBodyException extends CustomException {
  constructor(missingKeys: string[]) {
    super(
      "Body is missing required key: " + missingKeys.join(", "),
      "InvalidRequestBodyException",
    );
  }
}

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

export {
  InvalidRequestBodyException,
  EmailAlreadyInUseException,
  UsernameAlreadyTakenException,
};
