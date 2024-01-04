import * as fs from "fs";
import { UserRepo } from "../../userRepo";
import { User } from "../../../../domain/user";

const JSON_FILE_PATH = "users.json";

export class JSONUserRepo implements UserRepo {

  async getAllUsers(): Promise<User[]> {
    try {
      const data = fs.readFileSync(JSON_FILE_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const data = fs.readFileSync(JSON_FILE_PATH, "utf-8");
      const users = JSON.parse(data);
      return users.find((user: User) => user.getEmail() === email) || null;
    } catch (error) {
      return null;
    }
  }

  async getById(id: string): Promise<User | null> {
    try {
      const data = fs.readFileSync(JSON_FILE_PATH, "utf-8");
      const users = JSON.parse(data).map(({ props, id }: any) =>
        User.fromJSON(props, id)
      );
      return users.find((user: User) => user.getId() === id) || null;
    } catch (error) {
      return null;
    }
  }

  async save(user: User): Promise<void> {
    try {
      const users = await this.getAllUsers();
      users.push(user);
      fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(users, null, 2));
    } catch (error) {
      throw new Error("Failed to save user.");
    }
  }
}
