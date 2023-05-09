export class Result<T> {
  public readonly value?: T;

  private constructor(value?: T) {
    this.value = value;
  }

  public static success<T>(value: T): Result<T> {
    return new Result(value);
  }
}
