
// Todo: clean, similar to application.ts
// Todo: ensure all work still in front & back
// Todo: test

import { CustomError } from "./custom";

export namespace ServerErrors {

  export class InvalidRequestBodyError extends CustomError {
    constructor(missingKeys: string[]) {
      super(
        "Body is missing required key: " + missingKeys.join(", "),
        "InvalidRequestBodyError",
      );
    }
  }

  export class InvalidParamsError extends CustomError {
    constructor() {
      super("Params are invalid", "InvalidParamsError");
    }
  }
  
  export class MissingRequestParamsError extends CustomError {
    constructor(missingKeys: string[]) {
      super(
        "Params is missing required key: " + missingKeys.join(", "),
        "MissingRequestParamsError",
      );
    }
  }
  
  export class InvalidRequestParamsError extends CustomError {
    constructor(invalidKeys: string[]) {
      super(
        "Params has invalid key: " + invalidKeys.join(", "),
        "MissingRequestParamsError",
      );
    }
  }
  
  export class GenericServerError extends CustomError {
    constructor(message = "") {
      super(message ? `An error occurred: ${message}` : "An error occurred", "GenericServerError");
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
    | ServerErrors.InvalidRequestBodyError 
    | ServerErrors.InvalidParamsError 
    | ServerErrors.MissingRequestParamsError 
    | ServerErrors.InvalidParamsError 
    | ServerErrors.GenericServerError 
    | ServerErrors.DatabaseError;
}
