

// To create this, we need a navigation domain model, 
// a users domain model, 
// and 

import { NavigationDm } from "../../navigation/domain/navigationDm"
import { UserDm } from "../domain/userDm";

interface UserLoginViewModelProps {
  currentPage: string;
  isAuthenticated: boolean;
  username: string;
}

export class UserLoginViewModel {

  private props: UserLoginViewModelProps

  constructor(props?: UserLoginViewModelProps) {
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

  public static fromDomain (user: UserDm, navigation: NavigationDm): UserLoginViewModel {
    return new UserLoginViewModel({
      currentPage: navigation.currentPage,
      isAuthenticated: user.isAuthenticated(),
      username: user ? user.username : ''
    });
  }
}
