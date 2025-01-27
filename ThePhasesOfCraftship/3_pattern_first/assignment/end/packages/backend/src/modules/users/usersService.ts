import { CreateUserCommand } from "./usersCommand";
import {
  EmailAlreadyInUseException,
  UserNotFoundException,
  UsernameAlreadyTakenException,
} from "./usersExceptions";
import { ValidatedUser } from "@dddforum/shared/src/api/users";
import { TransactionalEmailAPI } from "../notifications/ports/transactionalEmailAPI";
import { UsersRepository } from "./ports/usersRepository";
import { TextUtil } from "@dddforum/shared/src/utils/textUtil";


export class UsersService {
  constructor(
    private repository: UsersRepository,
    private emailAPI: TransactionalEmailAPI,
  ) {}

  async createUser(userData: CreateUserCommand) {
    const existingUserByEmail = await this.repository.findUserByEmail(
      userData.email,
    );
    if (existingUserByEmail) {
      throw new EmailAlreadyInUseException(userData.email);
    }

    const existingUserByUsername = await this.repository.findUserByUsername(
      userData.username,
    );
    if (existingUserByUsername) {
      throw new UsernameAlreadyTakenException(userData.username);
    }
    
    const validatedUser: ValidatedUser = {
      ...userData.props,
      password: TextUtil.createRandomText(10)
    }
    
    const prismaUser = await this.repository.save(validatedUser);

    await this.emailAPI.sendMail({
      to: validatedUser.email,
      subject: "Your login details to DDDForum",
      text: `Welcome to DDDForum. You can login with the following details </br>
      email: ${validatedUser.email}
      password: ${validatedUser.password}`,
    });

    return prismaUser;
  }

  async getUserByEmail(email: string) {
    const prismaUser = await this.repository.findUserByEmail(email);
    if (!prismaUser) {
      throw new UserNotFoundException(email);
    }
    return prismaUser;
  }

  async deleteUser(email: string) {
    await this.repository.delete(email);
  }
}
