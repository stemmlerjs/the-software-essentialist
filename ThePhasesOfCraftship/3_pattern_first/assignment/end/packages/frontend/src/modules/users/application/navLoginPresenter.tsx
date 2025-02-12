
import { UserLoginViewModel } from "./userLoginViewModel";
import { NavigationRepository } from "../../navigation/repos/navigationRepository";
import { observe } from "mobx";
import { UsersRepository } from "../repos/usersRepo";

export class NavLoginPresenter {
  public userLogin: UserLoginViewModel;

  constructor(
    public usersRepository: UsersRepository,
    private navigationRepository: NavigationRepository,
  ) {
    this.setupSubscriptions();
    this.userLogin = new UserLoginViewModel();
  }

  private setupSubscriptions () {
    observe(this.usersRepository, 'currentUser', (userDm) => {
      const navigation = this.navigationRepository.getCurrentNavigation();
      this.userLogin = UserLoginViewModel.fromDomain(userDm.newValue, navigation);
    });
  }

  async load(callback?: (userLogin: UserLoginViewModel) => void) {
    let user = await this.usersRepository.getCurrentUser();
    let navigation = await this.navigationRepository.getCurrentNavigation();

    this.userLogin = UserLoginViewModel.fromDomain(user, navigation);

    callback && callback(this.userLogin);
  }
}
