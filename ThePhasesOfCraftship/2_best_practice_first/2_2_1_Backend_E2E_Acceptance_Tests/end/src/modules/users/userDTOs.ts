
// We'll discuss this concept next.
export type CreateUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

// Making a basic response type
type Response <IsSuccessfulResponse extends boolean, DataIfSuccessful extends any | undefined, FailureMessageOrError extends string | Error> = {
  success: IsSuccessfulResponse;
  data?: DataIfSuccessful;
  error?: FailureMessageOrError;
}

type UserDTO = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

// All of the different paths we can go down
export type CreateUserSuccess = Response<true, UserDTO, ''>;
export type AccountAlreadyCreated = Response<false, undefined, 'This user was already created'>;
export type UsernameTaken = Response<false, undefined, ''>;
export type InvalidInput = Response<false, undefined, ''>;
export type ApplicationError = Response<false, undefined, ''>;

// export type CreateUserReponse = CreateUserSuccess 
//   | AccountAlreadyCreated 
//   | UsernameTaken 
//   | InvalidInput
//   | ApplicationError;