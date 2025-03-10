
// Todo: clean, similar to application.ts
// Todo: ensure all work still in front & back
// Todo: test

import { CustomError } from ".";

export namespace ServerErrors {

  export class InvalidRequestBodyException extends CustomError {
    constructor(missingKeys: string[]) {
      super(
        "Body is missing required key: " + missingKeys.join(", "),
        "InvalidRequestBodyException",
      );
    }
  }

  export class InvalidParamsException extends CustomError {
    constructor() {
      super("Params are invalid", "InvalidParamsException");
    }
  }
  
  export class MissingRequestParamsException extends CustomError {
    constructor(missingKeys: string[]) {
      super(
        "Params is missing required key: " + missingKeys.join(", "),
        "InvalidRequestParamsException",
      );
    }
  }
  
  export class InvalidRequestParamsException extends CustomError {
    constructor(invalidKeys: string[]) {
      super(
        "Params has invalid key: " + invalidKeys.join(", "),
        "InvalidRequestParamsException",
      );
    }
  }
  
  export class ServerErrorException extends CustomError {
    constructor() {
      super("An error occurred", "ServerErrorException");
    }
  }

  export class DatabaseError extends CustomError {
    constructor() {
      super(
        "An error occurred saving to the database",
        "DatabaseError",
      );
    }
  }

  export type AnyServerError = 
    | ServerErrors.InvalidRequestBodyException 
    | ServerErrors.InvalidParamsException 
    | ServerErrors.MissingRequestParamsException 
    | ServerErrors.InvalidRequestParamsException 
    | ServerErrors.ServerErrorException 
    | ServerErrors.DatabaseError;
}
