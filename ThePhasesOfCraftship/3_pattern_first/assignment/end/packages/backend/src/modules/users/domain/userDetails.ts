
import { UserDTO } from "@dddforum/shared/src/api/users"
import { User as PrismaUserModel } from "@prisma/client"

export class UserDetails {
  public static toDTO (model: PrismaUserModel): UserDTO {
    return {
      id: model.id,
      email: model.email,
      firstName: model.firstName,
      lastName: model.lastName,
      roles: []
    }
  }
}
