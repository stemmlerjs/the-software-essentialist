import { AuthRepository } from "../../modules/users/repos/authRepository";
import { MembersRepo } from "../members/membersRepo";

export class RootStore {
  constructor(
    public auth: AuthRepository,
    public members: MembersRepo,
  ) {}
} 