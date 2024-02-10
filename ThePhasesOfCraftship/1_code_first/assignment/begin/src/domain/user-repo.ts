import { User } from "./user";

export interface UserRepo {
  exists(userEmail: string): Promise<boolean>;
  getUserByUserId(userId: number): Promise<User | null>;
  getUserByUserName(userName: string): Promise<User | null>;
  save(user: User): Promise<User>;
}
