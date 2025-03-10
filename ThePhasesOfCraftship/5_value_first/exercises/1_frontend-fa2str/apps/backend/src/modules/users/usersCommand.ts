import {
  InvalidParamsException,
  InvalidRequestBodyException,
} from "@dddforum/backend/src/shared/exceptions";
import {
  isBetweenLength,
  isMissingKeys,
} from "@dddforum/backend/src/shared/utils/parser";
import { CreateUserParams } from "@dddforum/shared/src/api/users";

export class CreateUserCommand {
  private constructor(public props: CreateUserParams) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["email", "firstName", "lastName", "username"];
    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const input = body as CreateUserParams;

    return CreateUserCommand.fromProps(input);
  }

  static fromProps(props: CreateUserParams) {
    const isEmailValid = props.email.indexOf("@") !== -1;
    const isFirstNameValid = isBetweenLength(props.firstName, 2, 16);
    const isLastNameValid = isBetweenLength(props.lastName, 2, 25);
    const isUsernameValid = isBetweenLength(props.username, 2, 25);

    if (
      !isEmailValid ||
      !isFirstNameValid ||
      !isLastNameValid ||
      !isUsernameValid
    ) {
      throw new InvalidParamsException();
    }

    const { username, email, firstName, lastName } = props;

    return new CreateUserCommand({ email, firstName, lastName, username });
  }

  get email() {
    return this.props.email;
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get username() {
    return this.props.username;
  }
}
