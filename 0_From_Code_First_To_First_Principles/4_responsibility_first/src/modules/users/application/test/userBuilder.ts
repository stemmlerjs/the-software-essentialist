import { User } from "../../domain/user";

export class UserBuilder {

  build () {
    return new User()
  }

  asRole (role: Role) {
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
