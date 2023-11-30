
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

// All of the different paths we can go down; now, this API is not great. But it's a good
// start for us to lay down the edge cases in an API call. We'll focus on edge cases and scenarios
// and desiging a better Result or Response API that works for us in the next section. 
// The reason it doesn't work for us well here right now is because we've designed this 'forwards'
// instead of designing it backwards. It doesn't do what we want (strictly typing) because we've
// merely used technology to think forwards in terms of how it'd work. If we go to the production code
// and create the shape of what we want in reverse (actual usage), we'll end up with the code we need
// to properly achieve what we want.
 
export type CreateUserSuccess = Response<true, UserDTO, ''>;
export type AccountAlreadyCreated = Response<false, undefined, ''>;
export type UsernameTaken = Response<false, undefined, ''>;
export type InvalidInput = Response<false, undefined, ''>;
export type ApplicationError = Response<false, undefined, ''>;

// export type CreateUserReponse = CreateUserSuccess 
//   | AccountAlreadyCreated 
//   | UsernameTaken 
//   | InvalidInput
//   | ApplicationError;