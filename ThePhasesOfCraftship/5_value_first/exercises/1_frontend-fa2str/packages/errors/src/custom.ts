
export class CustomError extends Error {
  public type: string;
  constructor(message: string, type: string = "CustomError") {
    super(message)
    this.type = type;
  }
}