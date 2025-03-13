
import {
  UserNotFoundException,
} from "../usersExceptions";
import { UserDetails } from "../domain/userDetails";
import { IdentityServiceAPI } from "../externalServices/ports/identityServiceAPI";
import { ApplicationErrors } from "@dddforum/errors/application";

export class UserIdentityService {
  constructor(
    private identityServiceAPI: IdentityServiceAPI
  ) {}

  async getUserById (userId: string) {
    try {
      const user = await this.identityServiceAPI.getUserById(userId);
      if (user) {
        return user;
      } 
      return new ApplicationErrors.NotFoundError('user');
    } catch (err) {
      console.log(err);
      throw new Error('error occurreted getting user from service')
    }
  }

  async getUserByEmail(email: string) {
    const prismaUser = await this.identityServiceAPI.findUserByEmail(email);
    if (!prismaUser) {
      throw new UserNotFoundException(email);
    }
    return prismaUser;
  }

  async getUserDetailsByEmail (email: string) {
    const userModel = await this.identityServiceAPI.findUserByEmail(email);
    if (!userModel) {
      throw new UserNotFoundException(email);
    }
    return UserDetails.toDTO(userModel);
  }
}
