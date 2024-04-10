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

export { InvalidRequestBodyException, StudentNotFoundException };
