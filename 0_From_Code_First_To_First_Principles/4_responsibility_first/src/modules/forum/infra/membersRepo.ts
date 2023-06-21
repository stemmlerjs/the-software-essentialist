

import { Repository } from "../../../shared/infra/database/ports/repository";
import { Maybe } from "../../../shared/utils/maybe";
import { Member } from "../domain/member";

export abstract class MembersRepo extends Repository<Member> {
  // abstract findByEmail (email: string): Promise<Maybe<Member>>;
}

export class PrismaMembersRepo extends MembersRepo {

  constructor () {
    super()
  }
  
}

