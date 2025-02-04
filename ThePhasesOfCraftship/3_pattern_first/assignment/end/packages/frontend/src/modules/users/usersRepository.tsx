
import { APIClient, Users } from "@dddforum/shared/src/api"
import { UserDm } from "./userDm";
import { makeAutoObservable } from "mobx";

export class UsersRepository {

  private gateway: APIClient;
  private userDm: UserDm;

  constructor (gateway: APIClient) {
    makeAutoObservable(this);
    this.gateway = gateway
    this.userDm = new UserDm();
  }

  public register (registrationDetails: Users.CreateUserParams) {
    return this.gateway.users.register(registrationDetails);
  }

  public async loadAuthenticatedUser () {
    // If the user is already loaded, just return it.
    if (this.userDm.isAuthenticated) return this.userDm;

    // If the user isn't already loaded, see if there's an auth token in cookie storage.

    // If there's no auth token, return the user domain model as is. The user will have to re-authenticate.
    
    // If there's an auth token, use it to authenticate the user and populate the user domain model. 
    // You will have to translate the DTO into a Domain Model.

    // If the auth fails, return the user domain model as is. The user will have to re-authenticate.
    return this.userDm;
  }
}
