import { PrismaClient } from "@prisma/client";
import { UsersRepository } from "../ports/usersRepository";
import { User } from "@dddforum/shared/src/api/users";
import { CreateUserCommand } from "../usersCommand";
import { generateRandomPassword } from "../../../shared/utils";

export class ProductionUserRepository implements UsersRepository {
  constructor(private prisma: PrismaClient) {}

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const maybeUser = await this.prisma.user.findFirst({ where: { email } });
      if (!maybeUser) return null;
      return maybeUser;
    } catch (err) {
      throw new Error("Database exception");
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      const maybeUser = await this.prisma.user.findFirst({ where: { id } });
      if (!maybeUser) return null;
      return maybeUser;
    } catch (err) {
      throw new Error("Database exception");
    }
  }

  async save(userData: CreateUserCommand) {
    const { email, firstName, lastName, username } = userData;
    return await this.prisma.$transaction(async () => {
      const user = await this.prisma.user.create({
        data: {
          email,
          username,
          firstName,
          lastName,
          password: generateRandomPassword(10),
        },
      });
      await this.prisma.member.create({
        data: { userId: user.id },
      });

      return user;
    });
  }

  async delete(email: string): Promise<void> {
    await this.prisma.user.delete({ where: { email: email } });
  }

  async findUserByUsername(username: string): Promise<User | null> {
    try {
      const maybeUser = await this.prisma.user.findFirst({
        where: { username },
      });
      if (!maybeUser) return null;
      return maybeUser;
    } catch (err) {
      throw new Error("Database exception");
    }
  }

  async update(
    id: number,
    props: Partial<CreateUserCommand>,
  ): Promise<User | null> {
    const prismaUser = await this.prisma.user.update({
      where: { id },
      data: props,
    });
    return prismaUser;
  }
}
