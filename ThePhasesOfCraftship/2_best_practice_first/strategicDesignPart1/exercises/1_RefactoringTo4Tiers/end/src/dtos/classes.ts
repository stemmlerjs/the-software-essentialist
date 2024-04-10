import { InvalidRequestBodyException } from "../shared/exceptions";
import { isMissingKeys } from "../shared/utils";

class CreateClassDTO {
  constructor(public name: string) {}

  /**
   * Factory method
   */

  static fromRequest(body: unknown) {
    const requiredKeys = ["name"];
    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { name } = body as { name: string };

    return new CreateClassDTO(name);
  }
}

export { CreateClassDTO };
