
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

export const createUsersAPI = (apiURL: string) => {
  return {
    register: async (input: CreateUserCommand) : Promise<APIResponse> => {
      try {
        const successResponse = await axios.post(`${apiURL}/users/new`, {
          ...input
        });
        return successResponse.data as APIResponse;
      } catch (err) {
        //@ts-ignore
        return err.response.data as APIResponse;
      }
    },
    getUserByEmail: async (input: GetUserByEmailQuery): Promise<APIResponse> => {
      try {
        const successResponse = await axios.get(`${apiURL}/users?email=${input.email}`)
        return successResponse.data as APIResponse;
      } catch (err) {
        //@ts-ignore
        return err.response.data as APIResponse;
      }
    }
  }
}