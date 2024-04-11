
class InvalidRequestBodyException extends Error {
  constructor(missingKeys: string[]) {
    super("Body is missing required key: " + missingKeys.join(", "));
  }
}

class StudentNotFoundException extends Error {
  constructor() {
    super("Student not found");
  }
}

class ClassNotFoundException extends Error {
  constructor(id: string) {
    super(`Class with id ${id} not found`);
  }
}

class StudentAlreadyEnrolledException extends Error {
  constructor() {
    super("Student is already enrolled in class");
  }
}

class AssignmentNotFoundException extends Error {
  constructor() {
    super("Assignment not found");
  }
}

class StudentAssignmentNotFoundException extends Error {
  constructor() {
    super(
      "Student assignment not found. Please, make sure the student is assigned to the assignment."
    );
  }
}

export {
  InvalidRequestBodyException,
  StudentNotFoundException,
  ClassNotFoundException,
  StudentAlreadyEnrolledException,
  AssignmentNotFoundException,
  StudentAssignmentNotFoundException,
};
