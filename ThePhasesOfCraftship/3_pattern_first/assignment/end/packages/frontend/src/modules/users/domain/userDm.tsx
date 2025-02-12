
import { Users } from "@dddforum/shared/src/api";
import { makeAutoObservable } from "mobx";

export class UserDm {
  public isAuthenticated: boolean = false;
  public username: string = "";

  constructor () {
    makeAutoObservable(this);
  }

  public static fromDTO (dto: Users.UserDTO): UserDm {
    return new UserDm();
  }

  public get memberRoles () {
    return [];
  }

  public canVote () {
    return this.memberRoles.includes('member');
  }
}
