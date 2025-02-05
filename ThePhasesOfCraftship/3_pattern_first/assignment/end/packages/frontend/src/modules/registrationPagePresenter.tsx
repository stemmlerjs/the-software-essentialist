
import { Users } from "@dddforum/shared/src/api";
import { HeaderNavigationViewModel } from "./headerNav/headerNavViewModel";
import { NavigationRepository } from "./navigation/navigationRepository";
import { UsersRepository } from "./users/usersRepository";
import { observe } from "mobx";

export class RegistrationPagePresenter {
  public headerNavVm: HeaderNavigationViewModel;

  constructor(
    public usersRepository: UsersRepository,
    private navigationRepository: NavigationRepository,
  ) {
    this.setupSubscriptions();
    this.headerNavVm = new HeaderNavigationViewModel();
  }

  private setupSubscriptions () {
    observe(this.usersRepository, 'userDm', (userDm) => this.load());
  }

  async register(registrationDetails: Users.CreateUserParams) {
    // Validate registration details

    // if valid, register user
    await this.usersRepository.register(registrationDetails);
  }

  async load(callback?: any) {
    let user = await this.usersRepository.getAuthenticatedCurrentUser();
    let navigation = await this.navigationRepository.getCurrentNavigation();

    this.headerNavVm = HeaderNavigationViewModel.create(
      user,
      navigation,
    );

    callback({
      headerNavigationViewModel: this.headerNavVm
    });
  }
}
