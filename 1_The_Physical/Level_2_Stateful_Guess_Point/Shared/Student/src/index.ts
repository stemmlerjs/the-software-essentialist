import {
  Email,
  EmailValidationError,
  FirstName,
  LastName,
} from "./domain/student/value-objects";
import { Result } from "./shared/result";

export interface StudentInputProps {
  firstName: string;
  lastName: string;
}

export interface StudentProps {
  firstName: FirstName;
  lastName: LastName;
  email: Email;
}

export interface InvalidNameProps {
  min?: string;
  max?: string;
  letters?: string;
  required?: string;
}

export interface InvalidStudentProps {
  firstName: InvalidNameProps;
  lastName: InvalidNameProps;
  email: EmailValidationError;
}

export class Student {
  private constructor(private readonly props: StudentProps) {}

  static create(
    props: StudentInputProps
  ): Result<Student, InvalidStudentProps> {
    const firstNameResult = FirstName.create(props.firstName);
    const lastNameResult = LastName.create(props.lastName);

    if (firstNameResult.isFailure() || lastNameResult.isFailure()) {
      return Result.failure({
        firstName: firstNameResult.error,
        lastName: lastNameResult.error,
      } as InvalidStudentProps);
    }

    if (firstNameResult.isSuccess() && lastNameResult.isSuccess()) {
      if (
        firstNameResult.value !== undefined &&
        lastNameResult.value !== undefined
      ) {
        const email = this.generateEmail(
          firstNameResult.value.value,
          lastNameResult.value.value
        );

        if (email.isFailure()) {
          return Result.failure({
            firstName: firstNameResult.error,
            lastName: lastNameResult.error,
            email: email.error,
          } as InvalidStudentProps);
        }

        if (email.value !== undefined) {
          return Result.success(
            new Student({
              firstName: firstNameResult.value,
              lastName: lastNameResult.value,
              email: email.value,
            })
          );
        }
      }
    }

    return Result.failure({
      firstName: {
        required: "Firstname is required",
      },
      lastName: {
        required: "Lastname is required",
      },
    } as InvalidStudentProps);
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
