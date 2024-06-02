import axios from "axios";
import { APIResponse, GenericErrors } from ".";

export type CreateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

export type User = {
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
export type CreateUserResponse = APIResponse<User | null, CreateUserErrors>;

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
  };
};
