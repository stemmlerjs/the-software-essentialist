

// To create this, we need a navigation domain model, 
// a users domain model, 
// and 

import { NavigationDm } from "../navigation/navigationDm"
import { UserDm } from "../users/userDm";

interface HeaderNavigationViewModelProps {
  currentPage: string;
  isAuthenticated: boolean;
  username: string;
}

export class HeaderNavigationViewModel {

  private props: HeaderNavigationViewModelProps

  constructor(props?: HeaderNavigationViewModelProps) {
    this.props = {
      currentPage: props ? props.currentPage : '',
      isAuthenticated: props ? props.isAuthenticated : false,
      username: props ? props.username : ''
    };
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
      isAuthenticated: user ? true : false,
      username: user ? user.username : ''
    });
  }
}
