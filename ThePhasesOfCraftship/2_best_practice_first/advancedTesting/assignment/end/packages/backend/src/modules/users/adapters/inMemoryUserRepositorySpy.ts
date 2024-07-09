import { ValidatedUser } from "@dddforum/shared/src/api/users";
import { Spy } from "../../../shared/testDoubles/spy";
import { UsersRepository } from "../ports/usersRepository";
import { CreateUserCommand } from "../usersCommand";
import { User } from "@prisma/client";

export class InMemoryUserRepositorySpy
  extends Spy<UsersRepository>
  implements UsersRepository
{
  private users: User[];

  constructor() {
    super();
    this.users = [];
  }

  save(user: ValidatedUser): Promise<User> {
    this.addCall("save", [user]);
    const newUser = {
      ...user,
      id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
      password: '',
    };
    this.users.push(newUser);
    return Promise.resolve({ ...newUser, password: "password" });
  }

  findById(id: number): Promise<User | null> {
    return Promise.resolve(this.users.find((user) => user.id === id) || null);
  }

  delete(email: string): Promise<void> {
    const index = this.users.findIndex((user) => user.email === email);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    return Promise.resolve();
  }

  async update(
    id: number,
    props: Partial<CreateUserCommand>,
  ): Promise<User | null> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...props };
      return Promise.resolve(this.users[userIndex]);
    }

    return Promise.resolve(null);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return Promise.resolve(
      this.users.find((user) => user.email === email) || null,
    );
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return Promise.resolve(
      this.users.find((user) => user.username === username) || null,
    );
  }

  async reset() {
    this.calls = [];
    this.users = [];
  }
}
