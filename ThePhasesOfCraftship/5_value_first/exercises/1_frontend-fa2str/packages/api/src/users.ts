import axios, { AxiosError } from "axios";
import { APIResponse } from ".";
import { ServerErrors } from "@dddforum/errors/server";
import { ApplicationErrors } from "@dddforum/errors/application";
import { TextUtil } from "@dddforum/core"

export namespace Types {
  export type DecodedIdToken = {
    email: string;
    uid: string;
  }
}

export type ValidatedUser = {
  id?: string;
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
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
};
export type EmailAlreadyInUseError = "EmailAlreadyInUse";
export type UsernameAlreadyTakenError = "UsernameAlreadyTaken";
export type CreateUserErrors =
  | EmailAlreadyInUseError
  | UsernameAlreadyTakenError;
  
export type CreateUserResponse = APIResponse<UserDTO, CreateUserErrors>;

export type UserNotFoundError = "UserNotFound";
export type GetUserByEmailErrors =  
  | UserNotFoundError;
export type GetUserByEmailResponse = APIResponse<UserDTO, GetUserByEmailErrors>;
export type GetUserErrors = GetUserByEmailErrors | CreateUserErrors;

export type UserResponse = APIResponse<
  CreateUserResponse | 
  GetUserByEmailResponse | null,
  GetUserErrors |
  ServerErrors.AnyServerError |
  ApplicationErrors.AnyApplicationError
>;

export namespace Commands {
  export class CreateUserCommand {
    private constructor(public props: CreateUserParams) {}
  
    static fromRequest(body: unknown) {
      const requiredKeys = ["email", "firstName", "lastName", "username"];
      const isRequestInvalid =
        !body || typeof body !== "object" || TextUtil.isMissingKeys(body, requiredKeys);
  
      if (isRequestInvalid) {
        throw new ServerErrors.InvalidRequestBodyError(requiredKeys);
      }
  
      const input = body as CreateUserParams;
  
      return CreateUserCommand.fromProps(input);
    }
  
    static fromProps(props: CreateUserParams) {
      const isEmailValid = props.email.indexOf("@") !== -1;
      const isFirstNameValid = TextUtil.isBetweenLength(props.firstName, 2, 16);
      const isLastNameValid = TextUtil.isBetweenLength(props.lastName, 2, 25);
      const isUsernameValid = TextUtil.isBetweenLength(props.username, 2, 25);
  
      if (
        !isEmailValid ||
        !isFirstNameValid ||
        !isLastNameValid ||
        !isUsernameValid
      ) {
        throw new ServerErrors.InvalidParamsError();
      }
  
      const { username, email, firstName, lastName } = props;
  
      return new CreateUserCommand({ email, firstName, lastName, username });
    }
  
    get email() {
      return this.props.email;
    }
  
    get firstName() {
      return this.props.firstName;
    }
  
    get lastName() {
      return this.props.lastName;
    }
  
    get username() {
      return this.props.username;
    }
  }
}

// TODO: implement
type AuthenticateResponse = any;

export const createUsersAPI = (apiURL: string) => {
  return {
    authenticate: async (code: string): Promise<CreateUserResponse> => {
      try {
        const successResponse = await axios.post(`${apiURL}/users/authenticate`, {
          code
        });
        return successResponse.data as AuthenticateResponse;
      } catch (_err: unknown) {
        if (axios.isAxiosError(_err) && _err.response) {
          return _err.response.data as AuthenticateResponse;
        }
        return {
          data: undefined,
          error: "Unknown error",
          success: false
        } as AuthenticateResponse;
      }
    },
    register: async (input: CreateUserParams): Promise<CreateUserResponse> => {
      try {
        const successResponse = await axios.post(`${apiURL}/users/new`, {
          ...input,
        });
        return successResponse.data as CreateUserResponse;
      } catch (_err: unknown) {
        if (axios.isAxiosError(_err) && _err.response) {
          return _err.response.data as CreateUserResponse;
        }
        return {
          data: undefined,
          error: "Unknown error",
          success: false
        } as CreateUserResponse;
      }
    },
    getUserByEmail: async (email: string): Promise<GetUserByEmailResponse> => {
      try {
        const successResponse = await axios.get(`${apiURL}/users/${email}`);
        return successResponse.data as GetUserByEmailResponse;
      } catch (_err: unknown) {
        if (axios.isAxiosError(_err) && _err.response) {
          return _err.response.data as GetUserByEmailResponse;
        }
        return {
          data: undefined,
          error: "Unknown error",
          success: false
        } as GetUserByEmailResponse;
      }
    },
  };
};
