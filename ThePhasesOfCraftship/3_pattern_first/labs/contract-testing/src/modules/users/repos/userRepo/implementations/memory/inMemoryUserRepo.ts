
import { User } from "../../../../domain/user";
import { UserRepo } from "../../userRepo";

export class InMemoryUserRepo implements UserRepo {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.getEmail() === email) || null;
  }

  async getById(id: string): Promise<User | null> {
    return this.users.find((user) => user.getId() === id) || null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}