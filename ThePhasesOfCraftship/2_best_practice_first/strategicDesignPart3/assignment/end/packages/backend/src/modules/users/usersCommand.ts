import { InvalidRequestBodyException } from "@dddforum/backend/src/shared/exceptions";
import { isMissingKeys } from "@dddforum/backend/src/shared/utils/parser";
import { CreateUserParams } from "@dddforum/shared/src/api/users";

export class CreateUserCommand {
  constructor(public props: CreateUserParams) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["email", "firstName", "lastName", "username"];
    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { username, email, firstName, lastName } = body as CreateUserParams;

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
