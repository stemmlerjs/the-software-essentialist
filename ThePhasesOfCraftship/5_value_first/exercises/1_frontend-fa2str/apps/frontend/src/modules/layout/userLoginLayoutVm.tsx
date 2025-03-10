
import { MemberDm } from "../../shared/stores/members/memberDm";
import { UserDm } from "../users/domain/userDm";

interface UserLoginLayoutViewModelProps {
  isAuthenticated: boolean;
  username: string | null;
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

  public static fromDomain (user: UserDm | null, member: MemberDm | null): UserLoginLayoutViewModel {

    const dm = new UserLoginLayoutViewModel({
      isAuthenticated: user ? true : false,
      username: member ? member.username : null
    });

    return dm
  }
}
