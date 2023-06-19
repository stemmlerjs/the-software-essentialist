
export type CreateUserInput = { email: string, firstName: string, lastName: string };

export interface UserAPI {
  createUser (input: CreateUserInput): Promise<void>;
}