export class ValidationError {
  public name: string;
  constructor(public message?: string) {
    this.name = this.constructor.name;
  }
}

export class PermissionError {
  public name: string;
  constructor(public message?: string) {
    this.name = this.constructor.name;
  }
}

export class MemberNotFoundError {
  public name: string;
  constructor(public message?: string) {
    this.name = this.constructor.name;
  }
}

export class CommentNotFoundError {
  public name: string;
  constructor(public message?: string) {
    this.name = this.constructor.name;
  }
}

export class ServerError {
  public name: string;
  constructor(public message?: string) {
    this.name = this.constructor.name;
  }
}

export type GenericErrors = ValidationError | ServerError;
