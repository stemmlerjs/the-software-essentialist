// :check:

import { CustomError } from ".";

export type ApplicationErrorName =
  | "ValidationError"
  | "ConfictError"
  | "PermissionError"
  | "NotFoundError"


export type ApplicationEntity = 'member' | 'comment' | 'user' | 'post'

export namespace ApplicationErrors {

  // TODO: Encapsulate the additional message responsibilty
  export class ConflictError extends CustomError {
    constructor(public conflictingEntity: ApplicationEntity, public additionalMessage = "") {
      super(
        `Conflicting entity ${conflictingEntity}${additionalMessage ? `: ${additionalMessage}` : ''}`,
        "ConfictError"
      );
    }
  }

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
    constructor(public missingEntityType: ApplicationEntity, public additionalMessage = "") {
      super(
        `Could not find ${missingEntityType}${additionalMessage ? `: ${additionalMessage}` : ''}`,
        "NotFoundError"
      );
    }
  }

  export type AnyApplicationError = ValidationError
    | PermissionError
    | NotFoundError;
}
