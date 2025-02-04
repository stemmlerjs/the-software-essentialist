import { APIClient, Users } from "@dddforum/shared/src/api"

export class UsersRepository {

  private gateway: APIClient;

  constructor (gateway: APIClient) {
    this.gateway = gateway
  }

  public register (registrationDetails: Users.CreateUserParams) {
    return this.gateway.users.register(registrationDetails);
  }
}
