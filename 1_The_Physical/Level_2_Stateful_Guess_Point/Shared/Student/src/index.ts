export interface StudentProps {
  firstName: string;
  lastName: string;
}

export interface InvalidNameProps {
  min: string;
  max: string;
  letters: string;
  required: string;
}

export interface InvalidStudentProps {
  [key: string]: InvalidNameProps;
  firstName: InvalidNameProps;
  lastName: InvalidNameProps;
}

export class Student {
  private studentEmail: string;

  private constructor(
    public readonly firstname: string,
    public readonly lastname: string
  ) {
    const lastnamePrefix = lastname.trim().slice(0, 5).toLowerCase();
    const firstnamePrefix = firstname.trim().slice(0, 2).toLowerCase();

    this.studentEmail = `${lastnamePrefix}${firstnamePrefix}@essentialist.dev`;
  }

  public static create(props: StudentProps): Student | InvalidStudentProps {
    let errors: InvalidStudentProps = {
      firstName: { min: "", max: "", letters: "", required: "" },
      lastName: { min: "", max: "", letters: "", required: "" },
    };

    errors = this.validateName(props.firstName, "firstName", 2, 10, errors);
    errors = this.validateName(props.lastName, "lastName", 2, 15, errors);

    if (
      Object.values(errors).some((props) => Object.values(props).some(Boolean))
    ) {
      return errors;
    }

    return new Student(props.firstName, props.lastName);
  }

  get email() {
    return this.studentEmail;
  }

  private static validateName(
    name: string,
    propName: "firstName" | "lastName",
    min: number,
    max: number,
    errors: InvalidStudentProps
  ): InvalidStudentProps {
    if (!name) {
      errors[propName].required = `${propName} is required`;
      return errors;
    }

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

    return errors;
  }
}
