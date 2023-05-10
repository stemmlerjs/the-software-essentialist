import { FirstName, LastName } from "./domain/student/value-objects";
import { Result } from "./shared/result";

export interface StudentInputProps {
  firstName: string;
  lastName: string;
}

export interface StudentProps {
  firstName: FirstName;
  lastName: LastName;
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
}

export class Student {
  private studentEmail: string;

  private constructor(private readonly props: StudentProps) {
    const lastNamePrefix = this.props.lastName.value
      .trim()
      .slice(0, 5)
      .toLowerCase();
    const firstNamePrefix = this.props.firstName.value
      .trim()
      .slice(0, 2)
      .toLowerCase();

    this.studentEmail = `${lastNamePrefix}${firstNamePrefix}@essentialist.dev`;
  }

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
        return Result.success(
          new Student({
            firstName: firstNameResult.value,
            lastName: lastNameResult.value,
          })
        );
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
    return this.studentEmail;
  }

  public get firstName() {
    return this.props.firstName.value;
  }

  public get lastName() {
    return this.props.lastName.value;
  }
}
