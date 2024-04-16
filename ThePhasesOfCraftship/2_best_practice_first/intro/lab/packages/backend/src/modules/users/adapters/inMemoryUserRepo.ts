import { UserDTO } from "../userDTO";
import { CreateUserInput, UserRepo } from "../userRepo";

export class InMemoryUserRepo implements UserRepo {

  private users: UserDTO[];
  
  constructor () {
    this.users = [];
  }
  
  getUserByEmail(email: string): Promise<UserDTO | undefined> {
    return Promise.resolve(this.users.find((user) => user.email === email));
  }
  
  save(user: CreateUserInput): Promise<UserDTO> {
    const newUser: UserDTO = { ...user, id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1 };
    this.users.push(newUser);
    return Promise.resolve(newUser);
  }
  
  findById(id: number): Promise<UserDTO | undefined> {
    return Promise.resolve(this.users.find((user) => user.id === id));
  }
  
  delete(email: string): Promise<void> {
    const index = this.users.findIndex((user) => user.email === email);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    return Promise.resolve();
  }
  
  getUserByUsername(username: string): Promise<UserDTO | undefined> {
    return Promise.resolve(this.users.find((user) => user.username === username));
  }
  
  async update(id: number, props: Partial<CreateUserInput>): Promise<UserDTO | undefined> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...props };
      return Promise.resolve(this.users[userIndex]);
    }
    
  }
}