

import { Maybe } from "../../../shared/utils/maybe"
import { User } from "../domain/user"
import { UserRepo } from "./usersRepo"

export class PrismaUserRepo extends UserRepo {

  constructor () {
    super()
  }

  async findByEmail(email: string): Promise<Maybe<User>> {
    return 
  }
  
}