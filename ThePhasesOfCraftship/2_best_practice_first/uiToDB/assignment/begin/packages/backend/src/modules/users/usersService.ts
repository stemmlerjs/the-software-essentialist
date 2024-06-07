import { Database } from "@dddforum/backend/src/shared/database";
import { CreateUserCommand } from "./usersCommand";
import {
  EmailAlreadyInUseException,
  UserNotFoundException,
  UsernameAlreadyTakenException,
} from "./usersExceptions";
import { User } from "@dddforum/shared/src/api/users";
import { TransactionalEmailAPI } from "../notifications/transactionalEmailAPI";

export class UsersService {
  constructor(
    private db: Database,
    private emailAPI: TransactionalEmailAPI,
  ) {}

  async createUser(userData: CreateUserCommand): Promise<User> {
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

    const { password, ...user } = await this.db.users.save(userData);

    await this.emailAPI.sendMail({
      to: user.email,
      subject: "Your login details to DDDForum",
      text: `Welcome to DDDForum. You can login with the following details </br>
      email: ${user.email}
      password: ${password}`,
    });

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
