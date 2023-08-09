import { NotFoundError, BadRequestError } from "../errorHandlers";

export class EmailAlreadyExistsError extends BadRequestError {
  constructor(message: string = "Email already exists") {
    super(message);
    this.name = "EmailAlreadyExistsError";
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
