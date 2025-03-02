
import { UserLoginViewModel } from "./userLoginViewModel";
import { makeAutoObservable, observe } from "mobx";
import { UsersRepository } from "../repos/usersRepo";
import { NavigationService } from "../../../shared/navigation/navigationService";

export class NavLoginPresenter {
  public userLogin: UserLoginViewModel | null;

  constructor(
    public usersRepository: UsersRepository,
    private navigationService: NavigationService,
  ) {
    makeAutoObservable(this);
    this.setupSubscriptions();
    this.userLogin = null;
  }

  private setupSubscriptions () {
    observe(this.usersRepository, 'currentUser', (userDm) => {
      const navigation = this.navigationService.getCurrentNavigation();
      this.userLogin = UserLoginViewModel.fromDomain(userDm.newValue, navigation);
    });
  }

  async load(callback?: (userLogin: UserLoginViewModel) => void) {
    let user = await this.usersRepository.getCurrentUser();
    let navigation = await this.navigationService.getCurrentNavigation();

    console.log(user);

    this.userLogin = UserLoginViewModel.fromDomain(user, navigation);

    callback && callback(this.userLogin);
  }
}
