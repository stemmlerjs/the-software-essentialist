

import { MemberDm } from "@/modules/auth/domain/memberDm";
import { UserDm } from "@/modules/auth/domain/userDm";

interface UserLoginLayoutViewModelProps {
  isAuthenticated: boolean;
  username: string | null;
  hasCompletedOnboarding: boolean;
}

export class UserLoginLayoutViewModel {

  private props: UserLoginLayoutViewModelProps

  constructor(props: UserLoginLayoutViewModelProps) {
    this.props = props;
  }

  get isAuthenticated () {
    return this.props.isAuthenticated
  }

  get username () {
    return this.props.username;
  }

  get hasCompletedOnboarding () {
    return this.props.hasCompletedOnboarding;
  }

  public static fromDomain (user: UserDm | null, member: MemberDm | null): UserLoginLayoutViewModel {

    const vm = new UserLoginLayoutViewModel({
      isAuthenticated: user ? true : false,
      username: member ? member.username : null,
      hasCompletedOnboarding: member ? true : false
    });

    return vm;
  }
}
