import { APIClient, Users } from "@dddforum/shared/src/api"
import { UserDm } from "./userDm";

export class UsersRepository {

  private gateway: APIClient;
  private userDm: UserDm;

  constructor (gateway: APIClient) {
    this.gateway = gateway
    this.userDm = new UserDm();
  }

  public register (registrationDetails: Users.CreateUserParams) {
    return this.gateway.users.register(registrationDetails);
  }

  public async loadAuthenticatedUser () {
    return this.userDm
  }
}
