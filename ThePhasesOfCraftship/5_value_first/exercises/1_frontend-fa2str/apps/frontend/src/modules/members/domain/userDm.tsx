import { Users, Members } from "@dddforum/api";
import { User, UserCredential } from "firebase/auth";
import { makeAutoObservable } from "mobx";

// Unify all props in one interface
interface UserDmProps {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  userRoles: string[];
  firebaseCredentials?: UserCredential;
}

export class UserDm {

  private props: UserDmProps;

  constructor (
    props: UserDmProps
  ) {
    this.props = props;
    makeAutoObservable(this);
  }

  get id () {
    return this.props.id;
  }

  get email () {
    return this.props.email;
  }

  public static fromFirebaseCredentials (credentials: UserCredential) {
    return new UserDm({
      id: credentials.user.uid,
      email: credentials.user.email ?? '',
      firstName: '(unknown)',
      lastName: '(unknown)',
      username: credentials.user.email ?? undefined,
      userRoles: [],
      firebaseCredentials: credentials
    })
  }

  public static fromDTO (dto: Users.UserDTO): UserDm {
    return new UserDm({
      id: dto.id,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      username: dto.email,
      userRoles: dto.roles ?? [],
    });
  }

  public canVote () {
    return this.props.userRoles.includes(Members.Types.MemberRoles.Level1);
  }

  public get username () {
    return this.props.username;
  }

  public toLocalStorage() {
    return {
      username: this.props.username,
      userRoles: this.props.userRoles
    };
  }

  public static fromLocalStorage(rawUser: {
    id: string;
    isAuthenticated: boolean;
    username?: string;
    userRoles: string[];
  }): UserDm {
    return new UserDm({
      id: rawUser.id,
      username: rawUser.username,
      userRoles: rawUser.userRoles || []
    });
  }

  /**
   * Creates a user from the raw Firebase User (without the full credential)
   */
  public static fromFirebaseUser(firebaseUser: import('firebase/auth').User): UserDm {
    return new UserDm({
      id: firebaseUser.uid,
      email: firebaseUser.email ?? '',
      firstName: '(unknown)',
      lastName: '(unknown)',
      username: firebaseUser.email || undefined,
      userRoles: [],
    });
  }

  /**
   * Creates a user from simple primitives (e.g. your own test data)
   */
  public static fromPrimitives(props: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }): UserDm {
    return new UserDm({
      id: props.id,
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      username: props.email, // or any other logic
      userRoles: [],
    });
  }
}
