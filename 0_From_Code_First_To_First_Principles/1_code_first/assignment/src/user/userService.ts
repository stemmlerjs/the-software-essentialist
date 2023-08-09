
import { PrismaClient } from "@prisma/client";
import { CreateUserRequest, EditUserRequest } from "./userInputModels";
import { EmailAlreadyExistsError, UserIdNotFoundError, EmailNotFoundError, InvalidUserInputError } from "./userRequestErrors";

export class UserService {
  private prisma = new PrismaClient();

  async createUser(user: CreateUserRequest) {
    if (!user.email || !user.email.includes("@") || !user.name) {
      throw new InvalidUserInputError("Invalid email or name");
    }
    
    const existingUser = await this.prisma.user.findUnique({ where: { email: user.email } });
    if (existingUser) {
      throw new EmailAlreadyExistsError();
    }
    
    return await this.prisma.user.create({ data: user });
  }

  async editUser(id: number, user: EditUserRequest) {
    if (isNaN(id)) {
      throw new InvalidUserInputError("ID is not a number");
    }

    if (user.email && !user.email.includes("@")) {
      throw new InvalidUserInputError("Invalid email format");
    }

    const existingUserId = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUserId) {
      throw new UserIdNotFoundError();
    }

    const existingUserEmail = await this.prisma.user.findUnique({ where: { email: user.email } });
    if (existingUserEmail) {
      throw new EmailAlreadyExistsError();
    }

    return await this.prisma.user.update({ where: { id }, data: user });
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new EmailNotFoundError();
    }

    return user;
  }
}
