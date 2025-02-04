import { Users } from "@dddforum/shared/src/api";
import { UsersRepository } from "../usersRepository";
import { HeaderNavigationViewModel } from "../headerNavigationViewModel";

export class RegistrationPresenter {
  constructor (private usersRepository: UsersRepository) { 
    
  }
  async register (registrationDetails: Users.CreateUserParams) {
    // Validate registration details

    // if valid, register user
    await this.usersRepository.register(registrationDetails);
  }

  async load (callback: any) {
    callback({
      headerNavigationViewModel: new HeaderNavigationViewModel()
    });
  }
}
