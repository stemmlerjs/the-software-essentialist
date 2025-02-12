
import { Users } from "@dddforum/shared/src/api";
import { HeaderNavigationViewModel } from "../../headerNav/headerNavViewModel";
import { NavigationRepository } from "../../navigation/navigationRepository";
import { observe } from "mobx";
import { UsersRepository } from "../repos/usersRepo";

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
    observe(this.usersRepository, 'currentUser', (userDm) => this.load());
  }

  async register(registrationDetails: Users.CreateUserParams) {
    // Validate registration details

    // if valid, register user
    await this.usersRepository.register(registrationDetails);
  }

  async load(callback?: any) {
    let user = await this.usersRepository.getCurrentUser();
    let navigation = await this.navigationRepository.getCurrentNavigation();

    this.headerNavVm = HeaderNavigationViewModel.create(
      user,
      navigation,
    );

    callback(this.headerNavVm);
  }
}
