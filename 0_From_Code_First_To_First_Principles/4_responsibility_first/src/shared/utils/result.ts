
type Success<T> = Result<T, undefined>;
type Failure<U> = Result<undefined, U>;

export type Either<T, U> = Success<T> | Failure<U>;

export class Result<SuccessType, FailureType> {
  private success: boolean;
  private successType?: SuccessType;
  private failureType?: FailureType;

  constructor (success: boolean, SuccessType?: SuccessType, FailureType?: FailureType) {
    this.success = success;
    this.successType = SuccessType;
    this.failureType = FailureType;
  }

  public static ok<SuccessType>(value?: SuccessType) : Success<SuccessType> {
    return new Result<SuccessType, undefined>(true, value);
  }

  public static fail<FailureType> (failure: FailureType): Failure<FailureType> {
    return new Result<undefined, FailureType>(false, undefined, failure);
  }

  public isSuccess (): boolean {
    return this.success;
  }

  public getData (): SuccessType {
    return this.successType as SuccessType;
  }

  public getError (): FailureType {
    return this.failureType as FailureType;
  }

  public hasErrors (): boolean {
    return this.isSuccess() === false;
  }
}

// type User = { email: string }

// function createUser (email: string, pass: string) {
  
//   if (email !== '') return Result.fail<ValidationError>(new ValidationError('not valid'));

//   return Result.ok<User>({ email: 'hi'})

// }

// let u = Result.ok<number>(3)

// let result = createUser('email', 'pass')

// result.isSuccess() ? result.getData()?.email





// export type Either<T, U = Error> = 
//   SuccessfulResultType<T> |
//   FailureResultType<U>;

// type SuccessfulResultType<T> = {
//   success: true;
//   data: T;
// }

// type FailureResultType <U = Error> = {
//   success: false;
//   getErrors(): U[]
//   getFirstError(): U;
// }

// export class Result {
//   public static ok<T, U = Error> (data: T): Either<T, U> {
//     return {
//       success: true,
//       data: data as T
//     } as SuccessfulResultType<T>
//   }

//   // public static emptyOK<T, U> (): Either<T, U> {
//   //   return {
//   //     success: true,
//   //     data: undefined
//   //   }
//   // }

//   public static fail<U> (errorOrErrors: U | U[]): Either<unknown, U> {
//     let errorsArray = Array.isArray(errorOrErrors) ? errorOrErrors : [errorOrErrors];
//     return {
//       success: false,
//       getErrors: () => errorsArray,
//       getFirstError: () => errorsArray[0]
//     } as FailureResultType<U>
//   }
// }


// // let er = Result.ok<number[]>([3,4]);

// // er.success ? console.log(er.data) : ''

// // let eee = Result.fail<ValidationError[]>([new ValidationError('')]);

// // !eee.success ? console.log(eee.getFirstError()) : ''