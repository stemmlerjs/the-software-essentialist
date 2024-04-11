import { InvalidRequestBodyException } from "../shared/exceptions";
import { isMissingKeys } from "../shared/utils";

class CreateAssignmentDTO {
  constructor(public classId: string, public title: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["classId", "title"];
    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { classId, title } = body as { classId: string; title: string };

    return new CreateAssignmentDTO(classId, title);
  }
}

class AssignStudentDTO {
  constructor(public studentId: string, public assignmentId: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["studentId", "assignmentId"];
    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentId, assignmentId } = body as {
      studentId: string;
      assignmentId: string;
    };

    return new AssignStudentDTO(studentId, assignmentId);
  }
}

class SubmitAssignmentDTO {
  constructor(public studentId: string, public assignmentId: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["studentId", "assignmentId"];
    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentId, assignmentId } = body as {
      studentId: string;
      assignmentId: string;
    };

    return new SubmitAssignmentDTO(studentId, assignmentId);
  }
}

class GradeAssignmentDTO {
  constructor(
    public studentId: string,
    public assignmentId: string,
    public grade: string
  ) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["studentId", "assignmentId", "grade"];
    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentId, assignmentId, grade } = body as {
      studentId: string;
      assignmentId: string;
      grade: string;
    };

    return new GradeAssignmentDTO(studentId, assignmentId, grade);
  }
}

export {
  CreateAssignmentDTO,
  AssignStudentDTO,
  SubmitAssignmentDTO,
  GradeAssignmentDTO,
};
