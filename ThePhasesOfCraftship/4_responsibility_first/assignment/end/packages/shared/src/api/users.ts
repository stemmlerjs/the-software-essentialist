import axios from "axios";
import { APIResponse, GenericErrors, ServerError } from ".";

export type ValidatedUser = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export type CreateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

export type UserDTO = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type EmailAlreadyInUseError = "EmailAlreadyInUse";
export type UsernameAlreadyTakenError = "UsernameAlreadyTaken";
export type CreateUserErrors =
  | GenericErrors
  | EmailAlreadyInUseError
  | UsernameAlreadyTakenError;
export type CreateUserResponse = APIResponse<UserDTO, CreateUserErrors>;

export type UserNotFoundError = "UserNotFound";
export type GetUserByEmailErrors = ServerError | UserNotFoundError;
export type GetUserByEmailResponse = APIResponse<UserDTO, GetUserByEmailErrors>;
export type GetUserErrors = GetUserByEmailErrors | CreateUserErrors;

export type UserResponse = APIResponse<
  CreateUserResponse | GetUserByEmailResponse | null,
  GetUserErrors
>;

export const createUsersAPI = (apiURL: string) => {
  return {
    register: async (input: CreateUserParams): Promise<CreateUserResponse> => {
      try {
        const successResponse = await axios.post(`${apiURL}/users/new`, {
          ...input,
        });
        return successResponse.data as CreateUserResponse;
      } catch (err) {
        //@ts-ignore
        return err.response.data as CreateUserResponse;
      }
    },
    getUserByEmail: async (email: string): Promise<GetUserByEmailResponse> => {
      try {
        const successResponse = await axios.get(`${apiURL}/users/${email}`);
        return successResponse.data as GetUserByEmailResponse;
      } catch (err) {
        //@ts-ignore
        return err.response.data as GetUserByEmailResponse;
      }
    },
  };
};
