export class NotFoundError extends Error {
  constructor(message: string = "Not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class BadRequestError extends Error {
  constructor(message: string = "Bad request") {
    super(message);
    this.name = "BadRequestError";
  }
}

export class FieldAlreadyExistError extends Error {
  constructor(message: string = "Field Already Exist") {
    super(message);
    this.name = "FieldAlreadyExistError";
  }
}
