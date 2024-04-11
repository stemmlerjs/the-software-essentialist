import { isMissingKeys, isUUID } from "../shared/utils";
import { InvalidRequestBodyException } from "../shared/exceptions";

class CreateStudentDTO {
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

    return new CreateStudentDTO(name);
  }
}

class StudentID {
  constructor(public id: string) {}

  /**
   * Factory method
   */

  static fromRequestParams(params: unknown) {
    const areParamsInvalid =
      !params || typeof params !== "object" || "id" in params === false;

    if (areParamsInvalid) {
      throw new InvalidRequestBodyException(["id"]);
    }

    const { id } = params as { id: string };

    if (!isUUID(id)) {
      throw new InvalidRequestBodyException(["id"]);
    }

    return new StudentID(id);
  }
}

export { CreateStudentDTO, StudentID };
