import { User } from "@dddforum/shared/src/api/users";
import { Spy } from "../../../shared/testDoubles/spy";
import { UsersRepository } from "../ports/usersRepository";
import { CreateUserCommand } from "../usersCommand";

export class InMemoryUserRepositorySpy
  extends Spy<UsersRepository>
  implements UsersRepository
{
  private users: User[];

  constructor() {
    super();
    this.users = [];
  }

  getUserByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find((user) => user.email === email));
  }

  save(user: CreateUserCommand): Promise<User & { password: string }> {
    this.addCall("save", [user]);
    const newUser: User = {
      ...user,
      id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
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

  getUserByUsername(username: string): Promise<User | undefined> {
    return Promise.resolve(
      this.users.find((user) => user.username === username),
    );
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
    return this.users.find((user) => user.email === email) || null;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) || null;
  }
}
