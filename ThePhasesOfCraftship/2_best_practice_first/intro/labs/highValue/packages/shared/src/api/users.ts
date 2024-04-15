
import axios from 'axios'
import { APIResponse } from '.';

export type CreateUserCommand = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type EditUserCommand = {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
};

export type GetUserByEmailQuery = {
  email: string;
}

// TODO: use mappers, dtos
export type UserData = {
  email: string;
}

export type CreateUserResponse = APIResponse<UserData>;
export type GetUserByEmailResponse = APIResponse<UserData>;

export const createUsersAPI = (apiURL: string) => {
  return {
    register: async (input: CreateUserCommand) : Promise<CreateUserResponse> => {
      try {
        const successResponse = await axios.post(`${apiURL}/users/new`, {
          ...input
        });
        return successResponse.data as CreateUserResponse;
      } catch (err) {
        //@ts-ignore
        return err.response.data as APIResponse;
      }
    },
    getUserByEmail: async (input: GetUserByEmailQuery): Promise<GetUserByEmailResponse> => {
      try {
        const successResponse = await axios.get(`${apiURL}/users?email=${input.email}`)
        return successResponse.data as GetUserByEmailResponse;
      } catch (err) {
        //@ts-ignore
        return err.response.data as APIResponse;
      }
    }
  }
}