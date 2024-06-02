import { Database } from "@dddforum/backend/src/shared/database";
import { CreateUserCommand } from "./usersCommand";
import {
  EmailAlreadyInUseException,
  UserNotFoundException,
  UsernameAlreadyTakenException,
} from "./usersExceptions";

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

    const user = await this.db.users.save(userData);

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.db.users.findUserByEmail(email);
    if (!user) {
      throw new UserNotFoundException(email);
    }
    return user;
  }
}
