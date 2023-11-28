import { CreateUserCommand } from "@dddforum/shared/src/api/users";
import { NumberUtil } from "@dddforum/shared/src/utils/numberUtil";
import { TextUtil } from "@dddforum/shared/src/utils/textUtil";

export class UserBuilder {
  private props: CreateUserCommand;

  constructor() {
    this.props = {
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      password: '',
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
  withUsername(value: string) {
    this.props.username = value;
    return this;
  }
  withRandomEmail() {
    const randomSequence = NumberUtil.generateRandomInteger(1000, 100000);
    this.props.email = `testEmail-${randomSequence}@gmail.com`;
    return this;
  }
  withRandomPassword() {
    this.props.password = TextUtil.createRandomText(10);
    return this;
  }

  build() {
    return this.props;
  }
}
