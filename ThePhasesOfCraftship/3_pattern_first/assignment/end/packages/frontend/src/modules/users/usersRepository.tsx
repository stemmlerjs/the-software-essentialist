
import { APIClient, Users } from "@dddforum/shared/src/api"
import { UserDm } from "./userDm";
import { makeAutoObservable } from "mobx";

export class UsersRepository {

  public api: APIClient;
  public userDm: UserDm;

  constructor (api: APIClient) {
    makeAutoObservable(this);
    this.api = api
    this.userDm = new UserDm();
  }

  public register (registrationDetails: Users.CreateUserParams) {
    return this.api.users.register(registrationDetails);
  }

  public async getAuthenticatedCurrentUser () {
    // If the user is already loaded, just return it.
    if (this.userDm.isAuthenticated) return this.userDm;

    // If the user isn't already loaded, see if there's an auth token in cookie storage.
    const tokenOrNothing = this.localStorage.getItem('authToken');

    // If there's no auth token, return the user domain model as is. The user will have to re-authenticate.
    if (!tokenOrNothing) return this.userDm;
    
    // If there's an auth token, use it to authenticate the user and populate the user domain model. 
    const response = await this.api.users.refreshToken(tokenOrNothing);

    // You will have to translate the DTO into a Domain Model.
    this.userDm = UserDm.fromRefreshTokenResponse(response);

    // If the auth fails, return the user domain model as is. The user will have to re-authenticate.
    return this.userDm;
  }
}
