
import { UserDTO } from "@dddforum/backend/src/modules/users/userDTO";
import { CreateUserCommand } from "@dddforum/shared/src/api/users";
import { NumberUtil } from "@dddforum/shared/src/utils/numberUtil";
import { TextUtil } from "@dddforum/shared/src/utils/textUtil";

export class UserDTOBuilder {
  private props: UserDTO;

  constructor() {
    this.props = {
      id: NumberUtil.generateRandomInteger(1000, 100000),
      email: '',
      firstName: '',
      lastName: '',
      username: '',
    };
  }

  public fromCommand (command: CreateUserCommand) {
    this.props.firstName = command.firstName;
    this.props.lastName = command.lastName;
    this.props.username = command.username;
    this.props.email = command.email;

    return this;
  }

  public withAllRandomDetails () {
    this.withRandomId();
    this.withFirstName(TextUtil.createRandomText(10));
    this.withLastName(TextUtil.createRandomText(10));
    this.withRandomEmail();
    this.withRandomUsername();
    return this;
  }

  withRandomId () {
    this.props.id = NumberUtil.generateRandomInteger(1000, 100000);
    return this;
  }

  public withId (value: number) {
    this.props.id = value;
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
