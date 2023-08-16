import { NotFoundError, BadRequestError, FieldAlreadyExistError } from "../errorHandlers";

export class UserAlreadyExistsError extends FieldAlreadyExistError {
  constructor(message: string = "User already exists") {
    super(message);
    this.name = "UserAlreadyExistsError";
  }
}

export class UserIdNotFoundError extends NotFoundError {
  constructor(message: string = "User ID not found") {
    super(message);
    this.name = "UserIdNotFoundError";
  }
}

export class EmailNotFoundError extends NotFoundError {
  constructor(message: string = "Email not found") {
    super(message);
    this.name = "EmailNotFoundError";
  }
}

export class InvalidUserInputError extends BadRequestError {
  constructor(message: string = "Invalid user input") {
    super(message);
    this.name = "InvalidUserInputError";
  }
}
