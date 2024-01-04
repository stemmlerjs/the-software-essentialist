
import { User } from "../../domain/user";

export interface UserRepo {
  getById (id: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  getUserByEmail (email: string): Promise<User | null>;
  save (user: User): Promise<any>;
}