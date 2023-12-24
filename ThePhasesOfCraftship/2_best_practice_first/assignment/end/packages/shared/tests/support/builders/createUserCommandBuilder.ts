
import { CreateUserCommand } from "@dddforum/shared/src/api/users";
import { NumberUtil } from "@dddforum/shared/src/utils/numberUtil";
import { TextUtil } from "@dddforum/shared/src/utils/textUtil";

export class CreateUserCommandBuilder {
  private props: CreateUserCommand;

  constructor() {
    this.props = {
      email: '',
      firstName: '',
      lastName: '',
      username: '',
    };
  }

  public withAllRandomDetails () {
    this.withFirstName(TextUtil.createRandomText(10));
    this.withLastName(TextUtil.createRandomText(10));
    this.withRandomEmail();
    this.withRandomUsername();
    return this;
  }

  public withFirstName(value: string) {
    this.props.firstName = value;
    return this;
  }
  withLastName(value: string) {
    this.props.lastName = value;
    return this;
  }

  withUsername (value: string) {
    this.props.username = value;
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

  withEmail (email: string) {
    this.props.email = email;
    return this;
  }

  build() {
    return this.props;
  }
}
