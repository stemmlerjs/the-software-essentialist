
import { UserDTO } from "@dddforum/api/users"
// import { User as PrismaUserModel } from "@prisma/client"

export class UserDetails {
  // TODO: Come back to this
  public static toDTO (model: any): UserDTO {
    return {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      roles: []
    }
  }
}
