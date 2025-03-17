import { Users, Members } from "@dddforum/api";
import { User, UserCredential } from "firebase/auth";
import { makeAutoObservable } from "mobx";

// Unify all props in one interface
interface UserDmProps {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
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
    });
  }

  public get username () {
    return this.props.username;
  }

  /**
   * Creates a user from the raw Firebase User (without the full credential)
   */
  public static fromFirebaseUser(firebaseUser: import('firebase/auth').User): UserDm {
    return new UserDm({
      id: firebaseUser.uid,
      email: firebaseUser.email as string,
      firstName: '(unknown)',
      lastName: '(unknown)',
      username: firebaseUser.email || undefined
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
      username: props.email,
    });
  }
}
