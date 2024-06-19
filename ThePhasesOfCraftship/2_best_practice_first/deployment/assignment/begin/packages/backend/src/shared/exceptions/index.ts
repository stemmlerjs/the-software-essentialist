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

class InvalidParamsException extends CustomException {
  constructor() {
    super("Params are invalid", "InvalidParamsException");
  }
}

class MissingRequestParamsException extends CustomException {
  constructor(missingKeys: string[]) {
    super(
      "Params is missing required key: " + missingKeys.join(", "),
      "InvalidRequestParamsException",
    );
  }
}

class InvalidRequestParamsException extends CustomException {
  constructor(invalidKeys: string[]) {
    super(
      "Params has invalid key: " + invalidKeys.join(", "),
      "InvalidRequestParamsException",
    );
  }
}

class ServerErrorException extends CustomException {
  constructor() {
    super("An error occurred", "ServerErrorException");
  }
}

export {
  InvalidRequestBodyException,
  ServerErrorException,
  InvalidRequestParamsException,
  MissingRequestParamsException,
  InvalidParamsException,
};
