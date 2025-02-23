
import { Users } from "@dddforum/shared/src/api";
import { MemberRoles } from "@dddforum/shared/src/api/members";
import { makeAutoObservable } from "mobx";

interface UserDmProps {
  isAuthenticated: boolean;
  username: string;
  userRoles: string[];
}

export class UserDm {

  private props: UserDmProps;

  constructor (
    props: UserDmProps
  ) {
    this.props = props;
    makeAutoObservable(this);
  }

  public static fromDTO (dto: Users.UserDTO): UserDm {
    return new UserDm(
      {
        isAuthenticated: false,
        username: dto.username,
        userRoles: dto.roles ? dto.roles : [],
      }
    );
  }

  public isAuthenticated () {
    return this.props.isAuthenticated;
  }

  public canVote () {
    return this.props.userRoles.includes(MemberRoles.Level1);
  }

  public get username () {
    return this.props.username;
  }
}
