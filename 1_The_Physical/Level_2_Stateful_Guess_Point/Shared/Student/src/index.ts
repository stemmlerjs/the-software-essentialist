export interface StudentProps {
  firstName: string;
  lastName: string;
}

export interface InvalidStudentProps {
  [key: string]: string | undefined;
  firstName?: string;
  lastName?: string;
}

export class Student {
  private studentEmail: string;

  private constructor(
    public readonly firstname: string,
    public readonly lastname: string
  ) {
    const errors: InvalidStudentProps = {};

    this.validateName(firstname, "Firstname", 2, 10, errors);
    this.validateName(lastname, "Lastname", 2, 10, errors);

    const lastnamePrefix = lastname.trim().slice(0, 5).toLowerCase();
    const firstnamePrefix = firstname.trim().slice(0, 2).toLowerCase();

    this.studentEmail = `${lastnamePrefix}${firstnamePrefix}@essentialist.dev`;
  }

  public static create(props: StudentProps): Student | InvalidStudentProps {
    return new Student(props.firstName, props.lastName);
  }

  get email() {
    return this.studentEmail;
  }

  private validateName(
    name: string,
    nameType: string,
    min: number,
    max: number,
    errors: InvalidStudentProps
  ): InvalidStudentProps {
    if (!name) {
      errors[nameType.toLowerCase()] = `${nameType} is required`;
    }

    name = name.trim();

    if (name.length < min) {
      errors[
        nameType.toLowerCase()
      ] = `${nameType} must be at least ${min} characters long`;
    }

    if (name.length > max) {
      errors[
        nameType.toLowerCase()
      ] = `${nameType} must be at most ${max} characters long`;
    }

    if (!/^[a-zA-Z]+$/.test(name)) {
      errors[nameType.toLowerCase()] = `${nameType} must contain only letters`;
    }

    return errors;
  }
}
