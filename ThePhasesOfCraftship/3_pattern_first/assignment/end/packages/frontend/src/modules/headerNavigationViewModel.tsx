

// 
// To create this, we need a navigation domain model, 
// a users domain model, 
// and 

import { NavigationDm } from "./navigationDm"
import { UserDm } from "./userDm"

interface HeaderNavigationViewModelProps {
  currentPage: string;
  isAuthenticated: boolean;
  username: string;
}

export class HeaderNavigationViewModel {

  private props: HeaderNavigationViewModelProps

  private constructor(props: HeaderNavigationViewModelProps) {
    this.props = props;
  }

  get currentPage () {
    return this.props.currentPage;
  }

  get isAuthenticated () {
    return this.props.isAuthenticated
  }

  get username () {
    return this.props.username;
  }

  public static create (user: UserDm, navigation: NavigationDm): HeaderNavigationViewModel {
    return new HeaderNavigationViewModel({
      currentPage: navigation.currentPage,
      isAuthenticated: user.isAuthenticated,
      username: user.username
    });
  }
}
