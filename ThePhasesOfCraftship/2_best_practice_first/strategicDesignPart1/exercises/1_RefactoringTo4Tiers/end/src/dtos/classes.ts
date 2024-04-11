import { InvalidRequestBodyException } from "../shared/exceptions";
import { isMissingKeys, isUUID } from "../shared/utils";

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

class EnrollStudentDTO {
  constructor(public studentId: string, public classId: string) {}

  /**
   * Factory method
   */

  static fromRequest(body: unknown) {
    const requiredKeys = ["studentId", "classId"];
    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentId, classId } = body as {
      studentId: string;
      classId: string;
    };

    return new EnrollStudentDTO(studentId, classId);
  }
}

class ClassId {
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

    return new ClassId(id);
  }
}

export { CreateClassDTO, EnrollStudentDTO, ClassId };
