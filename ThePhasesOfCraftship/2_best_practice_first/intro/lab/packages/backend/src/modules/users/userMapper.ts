import { User } from "@prisma/client";
import { UserDTO } from "./userDTO";

export class UserMapper {
  public static toDTO (prismaUser: User): UserDTO {
    return {
      id: prismaUser.id,
      username: prismaUser.username,
      lastName: prismaUser.lastName,
      email: prismaUser.email,
      firstName: prismaUser.firstName
    }
  }
}