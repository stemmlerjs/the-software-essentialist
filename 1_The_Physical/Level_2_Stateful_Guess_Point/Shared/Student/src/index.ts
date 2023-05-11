import {
  Email,
  EmailValidationError,
  FirstName,
  FirstNameValidationError,
  LastName,
  LastNameValidationError,
} from "./domain/student/value-objects";
import { Result } from "./shared/result";

interface StudentInputProps {
  firstName: string;
  lastName: string;
}

interface StudentProps {
  firstName: FirstName;
  lastName: LastName;
  email: Email;
}

interface InvalidStudentProps {
  firstName?: FirstNameValidationError;
  lastName?: LastNameValidationError;
  email?: EmailValidationError;
}

export class Student {
  private constructor(private readonly props: StudentProps) {}

  public static create(
    props: StudentInputProps
  ): Result<Student, InvalidStudentProps> {
    const firstNameResult = FirstName.create(props.firstName);
    const lastNameResult = LastName.create(props.lastName);
    const emailResult = Result.combine(firstNameResult, lastNameResult).flatMap(
      ([FirstName, LastName]) =>
        Student.generateEmail(FirstName.value, LastName.value)
    );

    const errors: InvalidStudentProps = {};
    if (firstNameResult.isFailure()) {
      errors.firstName = firstNameResult.error;
    }
    if (lastNameResult.isFailure()) {
      errors.lastName = lastNameResult.error;
    }
    if (emailResult.isFailure() && !(emailResult.error instanceof Array)) {
      errors.email = emailResult.error;
    }

    if (Object.keys(errors).length > 0) {
      return Result.failure(errors);
    }

    return Result.success(
      new Student({
        firstName: firstNameResult.value!,
        lastName: lastNameResult.value!,
        email: emailResult.value!,
      })
    );
  }

  public updateFirstName(
    firstName: string
  ): Result<Student, InvalidStudentProps> {
    return Student.create({ firstName, lastName: this.props.lastName.value });
  }

  public updateLastName(
    lastName: string
  ): Result<Student, InvalidStudentProps> {
    return Student.create({ firstName: this.props.firstName.value, lastName });
  }

  public get email() {
    return this.props.email.value;
  }

  public get firstName() {
    return this.props.firstName.value;
  }

  public get lastName() {
    return this.props.lastName.value;
  }

  private static generateEmail(
    firstName: string,
    lastName: string
  ): Result<Email, EmailValidationError> {
    const firstNamePrefix = firstName.trim().slice(0, 2).toLowerCase();
    const lastNamePrefix = lastName.trim().slice(0, 5).toLowerCase();

    return Email.generate({ local: `${lastNamePrefix}${firstNamePrefix}` });
  }
}
