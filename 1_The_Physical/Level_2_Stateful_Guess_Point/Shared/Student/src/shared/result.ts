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

  public static combine<T1, E1, T2, E2>(
    result1: Result<T1, E1>,
    result2: Result<T2, E2>
  ): Result<T1 | T2, E1 | E2> {
    if (result1.isSuccess() && result2.isSuccess()) {
      return Result.success({ ...result1.value!, ...result2.value! });
    }

    if (result1.isFailure() && result2.isFailure()) {
      return Result.failure({ ...result1.error!, ...result2.error! });
    }

    if (result1.isFailure()) {
      return Result.failure(result1.error!);
    }

    return Result.failure(result2.error!);
  }

  public flatMap<RT>(fn: (value: T) => Result<RT, E>): Result<RT, E> {
    return Result.failure(this.error!);
  }

  public isSuccess(): boolean {
    return this.value !== undefined;
  }

  public isFailure(): boolean {
    return this.error !== undefined;
  }
}
