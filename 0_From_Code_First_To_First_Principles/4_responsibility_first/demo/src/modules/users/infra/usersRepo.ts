

import { Repository } from "../../../shared/infra/database/ports/repository";
import { Maybe } from "../../../shared/utils/maybe";
import { User } from "../domain/user";

export abstract class UserRepo extends Repository<User> {
  abstract findByEmail (email: string): Promise<Maybe<User>>;
}

export class PrismaUserRepo extends UserRepo {

  constructor () {
    super()
  }

  async findByEmail(email: string): Promise<Maybe<User>> {
    return 
  }
  
}