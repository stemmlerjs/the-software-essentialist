
import { UserRepo } from '../infra/usersRepo';
import { CreateUserInput, UserAPI } from './usersAPI';

export class UsersService implements UserAPI {
  constructor(private usersRepo: UserRepo) {}

  async createUser(input: CreateUserInput): Promise<void> {
    
    const maybeUser = await this.usersRepo.findByEmail(input.email);

    // if (maybeUser.isFound()) {
    //   return new AlreadyCreatedError()
    // }

    // let userOrError = User.create(input);

    // if (userOrError.hasErrors()) {
    //   return userOrError.getError()
    // }

    // let user = userOrError.getValue();

    // this.usersRepo.saveAndPublishEvents(user);
  }
}
