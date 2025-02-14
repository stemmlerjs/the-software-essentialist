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
import { User } from "./domain/user";
import { UserDetails } from "./domain/userDetails";
import { MembersRepository } from "../members/repos/ports/membersRepository";


export class UsersService {
  constructor(
    private usersRepo: UsersRepository,
    private membersRepo: MembersRepository,
    private emailAPI: TransactionalEmailAPI,
  ) {}

  async createUser(userData: CreateUserCommand) {
    const existingUserByEmail = await this.usersRepo.findUserByEmail(
      userData.email,
    );
    if (existingUserByEmail) {
      throw new EmailAlreadyInUseException(userData.email);
    }

    const existingMemberByUsername = await this.membersRepo.findUserByUsername(
      userData.username,
    );

    if (existingMemberByUsername) {
      throw new UsernameAlreadyTakenException(userData.username);
    }
    
    const validatedUser: ValidatedUser = {
      ...userData.props,
      password: TextUtil.createRandomText(10)
    }
    
    const prismaUser = await this.usersRepo.save(validatedUser);

    await this.emailAPI.sendMail({
      to: validatedUser.email,
      subject: "Your login details to DDDForum",
      text: `Welcome to DDDForum. You can login with the following details </br>
      email: ${validatedUser.email}
      password: ${validatedUser.password}`,
    });

    return User.toDTO(prismaUser);
  }

  async getUserByEmail(email: string) {
    const prismaUser = await this.usersRepo.findUserByEmail(email);
    if (!prismaUser) {
      throw new UserNotFoundException(email);
    }
    return prismaUser;
  }

  async deleteUser(email: string) {
    await this.usersRepo.delete(email);
  }

  async getUserDetailsByEmail (email: string) {
    const userModel = await this.usersRepo.findUserByEmail(email);
    if (!userModel) {
      throw new UserNotFoundException(email);
    }
    return UserDetails.toDTO(userModel);
  }
}
