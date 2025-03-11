// :check:

import { CustomError } from ".";

export type ApplicationErrorName =
  | "ValidationError"
  | "PermissionError"
  | "NotFoundError"


export namespace ApplicationErrors {
  export class ValidationError extends CustomError {
    constructor(public message: string = "ValidationError") {
      super(message, "ValidationError");
    }
  }

  export class PermissionError extends CustomError {
    constructor(public message: string = "PermissionError") {
      super(message, "PermissionError"); 
    }
  }

  export class NotFoundError extends CustomError {
    constructor(public missingEntityType: 'member' | 'comment') {
      super(`Could not find ${missingEntityType}`, "NotFoundError");
    }
  }

  export type AnyApplicationError = ValidationError
    | PermissionError
    | NotFoundError;
}
