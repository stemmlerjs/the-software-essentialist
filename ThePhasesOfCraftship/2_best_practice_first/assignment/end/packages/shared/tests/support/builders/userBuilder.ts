import { CreateUserCommand } from "@dddforum/shared/src/api/users";
import { NumberUtil } from "@dddforum/shared/src/utils/numberUtil";

export class UserBuilder {
  private props: CreateUserCommand;

  constructor() {
    this.props = {
      email: '',
      firstName: '',
      lastName: '',
      username: '',
    };
  }

  public withFirstName(value: string) {
    this.props.firstName = value;
    return this;
  }
  withLastName(value: string) {
    this.props.lastName = value;
    return this;
  }
  withRandomUsername() {
    this.props.username = `username-${NumberUtil.generateRandomInteger(1000, 100000)}`;
    return this;
  }
  withRandomEmail() {
    const randomSequence = NumberUtil.generateRandomInteger(1000, 100000);
    this.props.email = `testEmail-${randomSequence}@gmail.com`;
    return this;
  }

  build() {
    return this.props;
  }
}
