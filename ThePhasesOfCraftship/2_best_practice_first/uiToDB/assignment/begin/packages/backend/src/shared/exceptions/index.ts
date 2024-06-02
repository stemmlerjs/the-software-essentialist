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

class ServerErrorException extends CustomException {
  constructor() {
    super("An error occurred", "ServerErrorException");
  }
}

export { InvalidRequestBodyException, ServerErrorException };
