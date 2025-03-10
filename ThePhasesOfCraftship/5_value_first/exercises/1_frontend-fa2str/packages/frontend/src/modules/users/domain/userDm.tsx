import { Users } from "@dddforum/shared/src/api";
import { MemberRoles } from "@dddforum/shared/src/api/members";
import { User, UserCredential } from "firebase/auth";
import { makeAutoObservable } from "mobx";

interface UserDmProps {
  // TODO: Remove
  firebaseCredentials?: UserCredential;
  isAuthenticated: boolean;
  username?: string;
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

  public static fromFirebaseCredentials (credentials: UserCredential) {
    return new UserDm({
      isAuthenticated: true,
      username: undefined,
      userRoles: [],
      firebaseCredentials: credentials
    })
  }

  public static fromDTO (dto: Users.UserDTO): UserDm {
    return new UserDm(
      {
        isAuthenticated: false,
        // TODO: Cleanup
        username: '',
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

  public toLocalStorage() {
    return {
      isAuthenticated: this.props.isAuthenticated,
      username: this.props.username,
      userRoles: this.props.userRoles
    };
  }

  public static fromLocalStorage(rawUser: {
    isAuthenticated: boolean;
    username?: string;
    userRoles: string[];
  }): UserDm {
    return new UserDm({
      isAuthenticated: rawUser.isAuthenticated,
      username: rawUser.username,
      userRoles: rawUser.userRoles || []
    });
  }

  public static fromFirebaseUser(user: User): UserDm {
    return new UserDm({
      isAuthenticated: true,
      username: user.email || undefined,
      userRoles: []  // Firebase doesn't store roles, we get those from our backend
    });
  }
}
