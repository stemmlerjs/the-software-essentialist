export interface UseCase<Request, Response> { 
  execute(request: Request): Promise<Response>;
}

interface SuccessResponse<T> {
  readonly success: true;
  readonly value: T;
}

interface FailureResponse<E> {
  readonly success: false;
  readonly error: E;
}

export type UseCaseResponse<T, E> = SuccessResponse<T> | FailureResponse<E>;

export class Result<T, E> {
  protected constructor(protected readonly response: UseCaseResponse<T, E>) {}

  public isSuccess(): this is { getValue(): T, getError(): never } {
    return this.response.success;
  }

  public isFailure(): this is { getError(): E, getValue(): never } {
    return !this.response.success;
  }

  public getValue(): T {
    if (!this.response.success) {
      throw new Error('Cannot get value from failed response');
    }
    return this.response.value;
  }

  public getError(): E {
    if (this.response.success) {
      throw new Error('Cannot get error from successful response');
    }
    return (this.response as FailureResponse<E>).error;
  }

  static success<T, E>(value: T): Result<T, E> {
    return new Result<T, E>({ success: true, value });
  }

  static failure<T, E>(error: E): Result<T, E> {
    return new Result<T, E>({ success: false, error });
  }
}

// Helper functions
export function fail<T, E>(error: E): Result<T, E> {
  return Result.failure(error);
}

export function success<T, E>(value: T): Result<T, E> {
  return Result.success(value);
}