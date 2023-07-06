
import { CreateUserInput } from "../dtos/createUserInput";

function generateRandomInteger(min: number, max: number) {
  return Math.floor(min + Math.random()*(max - min + 1))
}

export class UserBuilder {
  private props: CreateUserInput;

  constructor () {
    this.props = {
      email: '',
      firstName: '',
      lastName: '',
      username: ''
    }
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
    let randomSequence = generateRandomInteger(1000, 100000);
    this.props.email = `testEmail-${randomSequence}@gmail.com`;
    return this;
  }

  build() {
    return this.props;
  }
}
