
import axios from 'axios'

export type CreateUserCommand = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

export type GetUserByEmaiInput = {
  email: string;
}

export const createUsersAPI = (apiURL: string) => {
  return {
    register: (input: CreateUserCommand) => {
      return axios.post(`${apiURL}/users/new`, {
        ...input
      })
    },
    getUserByEmail: (input: GetUserByEmaiInput) => {
      return axios.get(`${apiURL}/users?email=${input.email}`);
    }
  }
}