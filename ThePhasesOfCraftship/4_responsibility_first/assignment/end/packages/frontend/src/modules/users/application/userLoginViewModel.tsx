
import { MemberDm } from "../../../stores/members/memberDm";
import { UserDm } from "../domain/userDm";

interface UserLoginViewModelProps {
  isAuthenticated: boolean;
  username: string | null;
}

export class UserLoginViewModel {

  private props: UserLoginViewModelProps

  constructor(props: UserLoginViewModelProps) {
    this.props = props;
  }

  get isAuthenticated () {
    return this.props.isAuthenticated
  }

  get username () {
    return this.props.username;
  }

  public static fromDomain (user: UserDm | null, member: MemberDm | null): UserLoginViewModel {

    const dm = new UserLoginViewModel({
      isAuthenticated: user ? true : false,
      username: member ? member.username : null
    });

    return dm
  }
}
