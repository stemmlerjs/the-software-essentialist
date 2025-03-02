
import { NavigationDm } from "../../../shared/navigation/domain/navigationDm";
import { UserDm } from "../domain/userDm";

interface UserLoginViewModelProps {
  pathname: string;
  isAuthenticated: boolean;
  username: string | null;
  linkText: "Join" | "Logout" | "";
}

export class UserLoginViewModel {

  private props: UserLoginViewModelProps

  constructor(props: UserLoginViewModelProps) {
    this.props = props;
  }

  get pathname () {
    return this.props.pathname;
  }

  get isAuthenticated () {
    return this.props.isAuthenticated
  }

  get username () {
    return this.props.username;
  }

  get linkText () {
    return this.props.linkText
  }

  public static fromDomain (user: UserDm | null, navigation: NavigationDm): UserLoginViewModel {

    const dm = new UserLoginViewModel({
      pathname: navigation.pathname,
      isAuthenticated: user ? true : false,
      username: user ? user.username : null,
    });

    return dm
  }
}
