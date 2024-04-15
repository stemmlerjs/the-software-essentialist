import { UserDTO } from "../userDTO";
import { CreateUserInput, UserRepo } from "../userRepo";

export class InMemoryUserRepo implements UserRepo {
  
  getUserByEmail(email: string): Promise<UserDTO | undefined> {
    throw new Error("Method not implemented.");
  }
  save(user: CreateUserInput): Promise<UserDTO> {
    throw new Error("Method not implemented.");
  }
  findById(id: number): Promise<UserDTO | undefined> {
    throw new Error("Method not implemented.");
  }
  delete(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getUserByUsername(username: string): Promise<UserDTO | undefined> {
    throw new Error("Method not implemented.");
  }
  update(id: number, props: Partial<CreateUserInput>): Promise<UserDTO> {
    throw new Error("Method not implemented.");
  }

}