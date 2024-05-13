import { InvalidRequestBodyException } from "../../shared/exceptions";
import { isMissingKeys } from "../../shared/utils/parser";

export class CreateUserDTO {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public username: string,
  ) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["email", "firstName", "lastName", "username"];
    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { username, email, firstName, lastName } = body as {
      email: string;
      firstName: string;
      lastName: string;
      username: string;
    };

    return new CreateUserDTO(email, firstName, lastName, username);
  }
}
