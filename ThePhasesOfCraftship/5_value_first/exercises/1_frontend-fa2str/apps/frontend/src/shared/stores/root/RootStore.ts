import { makeAutoObservable } from "mobx";
import { MembersStore } from "../members/membersStore";
import { UsersRepository } from "../../../modules/users/repos/usersRepo";

export class RootStore {
  constructor(
    public users: UsersRepository,
    public members: MembersStore
  ) {
    makeAutoObservable(this);
  }
} 