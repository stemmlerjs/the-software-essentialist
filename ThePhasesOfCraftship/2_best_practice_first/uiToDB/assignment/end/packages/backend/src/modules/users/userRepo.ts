
import { UserDTO } from "./userDTO";

export interface CreateUserInput {
  email: string;
  firstName: string;
  username: string;
  lastName: string;
  password: string;
}

export interface UserRepo {
  getUserByEmail (email: string): Promise<UserDTO | undefined>;
  // @note The ideal return type here is a domain object, not a DTO. For 
  // demonstration purposes, we've kept it intentionally simple to focus on testing.
  // @see Pattern-First for domain objects
  save (user: CreateUserInput): Promise<UserDTO>; 
  findById (id: number): Promise<UserDTO | undefined>;
  delete(email: string): Promise<void>;
  getUserByUsername (username: string): Promise<UserDTO | undefined>;
  update (id: number, props: Partial<CreateUserInput>): Promise<UserDTO | undefined>;
}