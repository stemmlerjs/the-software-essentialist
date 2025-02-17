
import { PrismaClient, User } from "@prisma/client";
import { UsersRepository } from "../ports/usersRepository";
import { generateRandomPassword } from "../../../shared/utils";
import { ValidatedUser } from "@dddforum/shared/src/api/users";
import { MemberReputationLevel } from "../../members/domain/member";

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

  async findById(id: string): Promise<User | null> {
    try {
      const maybeUser = await this.prisma.user.findFirst({ where: { id } });
      if (!maybeUser) return null;
      return maybeUser;
    } catch (err) {
      throw new Error("Database exception");
    }
  }

  async save(userData: ValidatedUser) {
    const { email, firstName, lastName, username } = userData;
    return await this.prisma.$transaction(async () => {
      const user = await this.prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: generateRandomPassword(10),
        },
      });

      // TODO: Refactor this out and away using events
      await this.prisma.member.create({
        data: { userId: user.id, username, reputationLevel: MemberReputationLevel.Level1, reputationScore: 0 },
      });

      return user;
    });
  }

  async delete(email: string): Promise<void> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) return;
    await this.prisma.$transaction([
      this.prisma.member.delete({
        where: {
          userId: user.id,
        },
      }),
      this.prisma.user.delete({ where: { email } }),
    ]);
  }

  async update(
    id: string,
    props: Partial<ValidatedUser>,
  ): Promise<User | null> {
    const prismaUser = await this.prisma.user.update({
      where: { id },
      data: props,
    });
    return prismaUser;
  }
}
