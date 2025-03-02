import { AuthRepository } from "../../modules/users/repos/authRepository";
import { MembersRepo } from "../../modules/members/repos/membersRepo";

export class RootStore {
  constructor(
    public auth: AuthRepository,
    public members: MembersRepo
  ) {}
} 