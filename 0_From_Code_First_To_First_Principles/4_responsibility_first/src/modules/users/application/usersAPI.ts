
import { UserRoleType } from "../domain/userRole";

export type CreateUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: UserRoleType;
};

export interface UserAPI {
  createUser(input: CreateUserInput): Promise<void>;
}
