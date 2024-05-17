import { Database } from "@dddforum/backend/src/shared/database";
import {
  EmailAlreadyInUseException,
  UsernameAlreadyTakenException,
} from "../../shared/exceptions";
import { CreateUserCommand } from "./usersCommand";

export class UsersService {
  constructor(private db: Database) {}

  async createUser(userData: CreateUserCommand) {
    const existingUserByEmail = await this.db.users.findUserByEmail(
      userData.email,
    );
    if (existingUserByEmail) {
      throw new EmailAlreadyInUseException(userData.email);
    }

    const existingUserByUsername = await this.db.users.findUserByUsername(
      userData.username,
    );
    if (existingUserByUsername) {
      throw new UsernameAlreadyTakenException(userData.username);
    }

    const { user } = await this.db.users.save(userData);

    return user;
  }
}
