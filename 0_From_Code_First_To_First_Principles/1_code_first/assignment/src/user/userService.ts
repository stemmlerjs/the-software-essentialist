
import { PrismaClient } from "@prisma/client";
import { CreateUserRequest, EditUserRequest } from "./userInputModels";

export class UserService {
  private prisma = new PrismaClient();

  async createUser(user: CreateUserRequest) {
    return await this.prisma.user.create({ data: user });
  }

  async editUser(id: number, user: EditUserRequest) {
    return await this.prisma.user.update({ where: { id }, data: user });
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
