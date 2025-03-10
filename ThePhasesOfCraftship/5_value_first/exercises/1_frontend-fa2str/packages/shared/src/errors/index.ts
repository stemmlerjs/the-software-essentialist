
export type ApplicationErrorName =
  | "ValidationError"
  | "PermissionError"
  | "MemberNotFoundError"
  | "CommentNotFoundError"
  | "PostNotFoundError"
  | "ServerError"
  | "NotFoundError"

export abstract class ApplicationError {
  constructor(
    public name: ApplicationErrorName,
    public message?: string,
  ) {}
}

export class ValidationError extends ApplicationError {
  constructor(public message?: string) {
    super("ValidationError", message);
  }
}

export class PermissionError extends ApplicationError {
  constructor(public message?: string) {
    super("PermissionError", message);
  }
}

export class MemberNotFoundError extends ApplicationError {
  constructor(public message?: string) {
    super("MemberNotFoundError", message);
  }
}

export class CommentNotFoundError extends ApplicationError {
  constructor(public message?: string) {
    super("CommentNotFoundError", message);
  }
}

export class PostNotFoundError extends ApplicationError {
  constructor(public message?: string) {
    super("PostNotFoundError", message);
  }
}

// TODO: Use this for all
export class NotFoundError extends ApplicationError {
  constructor(public message?: string) {
    super("NotFoundError", message);
  }
}

export class ServerError extends ApplicationError {
  constructor(public message?: string) {
    super("ServerError", message);
  }
}

export type GenericErrors = ValidationError | ServerError;
