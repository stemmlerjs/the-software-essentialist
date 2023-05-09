export class Result<T, E> {
  public readonly value?: T;
  public readonly error?: E;

  private constructor(value?: T, error?: E) {
    this.value = value;
    this.error = error;
  }

  public static success<T, E>(value: T): Result<T, E> {
    return new Result(value);
  }

  public static failure<T, E>(error: E): Result<T, E> {
    return new Result<T, E>(undefined, error);
  }

  public isSuccess(): boolean {
    return this.value !== undefined;
  }

  public isFailure(): boolean {
    return this.error !== undefined;
  }
}
