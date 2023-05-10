import { Result } from "./shared/result";

export interface StudentProps {
  firstName: string;
  lastName: string;
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

  private constructor(
    public readonly firstName: string,
    public readonly lastName: string
  ) {
    const lastNamePrefix = lastName.trim().slice(0, 5).toLowerCase();
    const firstNamePrefix = firstName.trim().slice(0, 2).toLowerCase();

    this.studentEmail = `${lastNamePrefix}${firstNamePrefix}@essentialist.dev`;
  }

  static create(props: StudentProps): Result<Student, InvalidStudentProps> {
    const errors = {
      firstName: {},
      lastName: {},
    };

    this.validateName(props.firstName, "firstName", 2, 10, errors);
    this.validateName(props.lastName, "lastName", 2, 15, errors);

    if (
      Object.values(errors).some((props) => Object.values(props).some(Boolean))
    ) {
      return Result.failure(errors);
    }

    return Result.success(new Student(props.firstName, props.lastName));
  }

  public updateFirstName(
    firstName: string
  ): Result<Student, InvalidStudentProps> {
    return Student.create({ firstName, lastName: this.lastName });
  }

  public updateLastName(
    lastName: string
  ): Result<Student, InvalidStudentProps> {
    return Student.create({ firstName: this.firstName, lastName });
  }

  get email() {
    return this.studentEmail;
  }

  private static validateName(
    name: string,
    propName: keyof InvalidStudentProps,
    min: number,
    max: number,
    errors: InvalidStudentProps
  ) {
    if (!name) {
      errors[propName].required = `${propName} is required`;
    } else {
      name = name.trim();

      if (name.length < min) {
        errors[
          propName
        ].min = `${propName} must be at least ${min} characters long`;
      }

      if (name.length > max) {
        errors[
          propName
        ].max = `${propName} must be at most ${max} characters long`;
      }

      if (!/^[a-zA-Z]+$/.test(name)) {
        errors[propName].letters = `${propName} must contain only letters`;
      }
    }
  }
}
