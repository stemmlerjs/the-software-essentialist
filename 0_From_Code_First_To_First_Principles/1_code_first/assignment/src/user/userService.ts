
import { PrismaClient } from "@prisma/client";
import { CreateUserRequest, EditUserRequest } from "./userInputModels";
import { UserAlreadyExistsError, UserIdNotFoundError, EmailNotFoundError, InvalidUserInputError } from "./userRequestErrors";
import { getHashedPassword } from "../utils";

export class UserService {
  private prisma = new PrismaClient();

  async createUser(user: CreateUserRequest) {
    if (!user.email || !user.username || !user.firstName || !user.lastName) {
      throw new InvalidUserInputError();
    }
    const existingUserName = await this.prisma.user.findUnique({ where: { username: user.username } });
    if (existingUserName) {
      throw new UserAlreadyExistsError("User name already exists");
    }
    
    const existingUserEmail = await this.prisma.user.findUnique({ where: { email: user.email } });
    if (existingUserEmail) {
      throw new UserAlreadyExistsError("Email already exists");
    }
    
    if (!user.email.includes("@")) {
      throw new InvalidUserInputError("Invalid email format");
    }

    user.password = await getHashedPassword(user.password);
        
    return await this.prisma.user.create({ data: user });
  }

  async editUser(id: number, user: EditUserRequest) {
    if (isNaN(id)) {
      throw new InvalidUserInputError("ID is not a number");
    }

    const existingUserId = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUserId) {
      throw new UserIdNotFoundError();
    }

    if (user.email) {
      if (!user.email.includes("@")) {
        throw new InvalidUserInputError("Invalid email format");
      }
      
      const existingUserEmail = await this.prisma.user.findUnique({ where: { email: user.email } });
      if (existingUserEmail && existingUserEmail.id !== id) {
        throw new UserAlreadyExistsError("Email already exists");
      }
    }

    if (user.password) {
      user.password = await getHashedPassword(user.password);
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
