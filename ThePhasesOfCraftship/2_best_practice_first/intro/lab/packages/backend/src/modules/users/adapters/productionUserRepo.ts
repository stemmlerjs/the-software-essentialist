
import { PrismaClient } from "@prisma/client";
import { CreateUserInput, UserRepo } from "../userRepo";
import { UserMapper } from "../userMapper";
import { UserDTO } from "../userDTO";

export class ProductionUserRepo implements UserRepo {
  constructor(private prisma: PrismaClient) {}

  async getUserByEmail(email: string): Promise<UserDTO | undefined> {
    try {
      const maybeUser = await this.prisma.user.findFirst({ where: { email } });
      if (!maybeUser) return undefined;
      return UserMapper.toDTO(maybeUser);
    } catch (err) {
      throw new Error("Database exception");
    }
  }

  async findById(id: number): Promise<UserDTO | undefined> {
    try {
      const maybeUser = await this.prisma.user.findFirst({ where: { id } });
      if (!maybeUser) return undefined;
      return UserMapper.toDTO(maybeUser);
    } catch (err) {
      throw new Error("Database exception");
    }
  }

  async save(userData: CreateUserInput) {
    let prismaUser = await this.prisma.user.create({
      data: {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        password: userData.password,
      },
    });

    return UserMapper.toDTO(prismaUser);
  }

  async delete (email: string): Promise<void> {
    await this.prisma.user.delete({ where: { email: email }})
  }

  async getUserByUsername(username: string): Promise<UserDTO | undefined> {
    try {
      const maybeUser = await this.prisma.user.findFirst({ where: { username }})
      if (!maybeUser) return undefined;
      return UserMapper.toDTO(maybeUser);
    } catch (err) {
      throw new Error("Database exception");
    }
  }

  async update(id: number, props: Partial<CreateUserInput>): Promise<UserDTO | undefined> {
    let prismaUser = await this.prisma.user.update({ where: { id }, data: props });
    return UserMapper.toDTO(prismaUser);
  }
}
