
export interface UseCase<Request, Response> { 
  execute(request: Request): Promise<Response>;
}

export class UseCaseResponse<T, U> {
  private value: T | undefined;
  private success: boolean;
  private error: U;

  constructor (value: T, success: boolean, error: U) {
    this.value = value;
    this.success = success;
    this.error = error
  }
  public isSuccess () : boolean {
    return this.success;
  }

  public getValue (): T | undefined {
    return this.value
  }

  public getError (): U {
    return this.error;
  }
}

export function fail<U> (error: U) {
  return new UseCaseResponse<undefined, U>(undefined, false, error)
}

export function success<T, U> (value: T) {
  return new UseCaseResponse<T, U>(value, true, undefined as unknown as U)
}