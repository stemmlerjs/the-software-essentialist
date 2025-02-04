
import { Users } from "@dddforum/shared/src/api";
import { HeaderNavigationViewModel } from "./headerNavViewModel";
import { NavigationRepository } from "../navigation/navigationRepository";
import { UsersRepository } from "../users/usersRepository";

export class HeaderPresenter {
  constructor(
    private usersRepository: UsersRepository,
    private navigationRepository: NavigationRepository,
  ) {}

  async register(registrationDetails: Users.CreateUserParams) {
    // Validate registration details

    // if valid, register user
    await this.usersRepository.register(registrationDetails);
  }

  async load(callback: any) {
    let user = await this.usersRepository.loadAuthenticatedUser();
    let navigation = await this.navigationRepository.getCurrentNavigation();

    callback({
      headerNavigationViewModel: HeaderNavigationViewModel.create(
        user,
        navigation,
      ),
    });
  }
}
