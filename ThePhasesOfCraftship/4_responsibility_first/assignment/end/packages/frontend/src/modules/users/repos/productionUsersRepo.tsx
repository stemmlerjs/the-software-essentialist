
import { APIClient, Users } from "@dddforum/shared/src/api"
import { UserDm } from "../domain/userDm";
import { makeAutoObservable } from "mobx";
import { UsersRepository } from "./usersRepo";

export class ProductionUsersRepository implements UsersRepository {

  public api: APIClient;
  public currentUser: UserDm | null;

  constructor (api: APIClient) {
    makeAutoObservable(this);
    this.api = api;
    this.currentUser = this.loadInitialUserState();
  }
  save(user: UserDm): void {
    this.currentUser = user;
  }

  private loadInitialUserState () {
    // not implemented;
    // use cookies, localstorage, auth tokens, etc. to determine if the user is authenticated
    // if they are, return a UserDm with the user's information
    return new UserDm({ isAuthenticated: false, username: '', userRoles: [] });
  }

  async getCurrentUser(): Promise<UserDm | null> {
    // If the user is already loaded, just return it.
    if (this.currentUser?.isAuthenticated()) return this.currentUser;

    // // If the user isn't already loaded, see if there's an auth token in cookie storage.
    // const tokenOrNothing = this.localStorage.getItem('authToken');

    // // If there's no auth token, return the user domain model as is. The user will have to re-authenticate.
    // if (!tokenOrNothing) return this.currentUser;
    
    // // If there's an auth token, use it to authenticate the user and populate the user domain model. 
    // const response = await this.api.users.refreshToken(tokenOrNothing);

    // // You will have to translate the DTO into a Domain Model.
    // this.currentUser = UserDm.fromRefreshTokenResponse(response);

    // If the auth fails, return the user domain model as is. The user will have to re-authenticate.
    return this.currentUser;
  }

  public register (registrationDetails: Users.CreateUserParams) {
    return this.api.users.register(registrationDetails);
  }
}
