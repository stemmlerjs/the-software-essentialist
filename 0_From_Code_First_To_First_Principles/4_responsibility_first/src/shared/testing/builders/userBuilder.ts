import { User } from "../../../modules/users/domain/user";
import { UserRoleType } from "../../../modules/users/domain/userRole";

export class UserBuilder {

  build () {
    return new User()
  }

  asRole (role: UserRoleType) {
    return this;
  }

  public static builder () {
    return new this();
  }
}

let existingUser = UserBuilder
    .builder()
    .asRole('member')
    .build()
