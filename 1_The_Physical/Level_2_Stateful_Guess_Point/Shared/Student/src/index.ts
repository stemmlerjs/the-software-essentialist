export class Student {
  private studentEmail: string;

  private constructor(
    public readonly firstname: string,
    public readonly lastname: string
  ) {
    this.validateName(firstname, "Firstname", 2, 10);
    this.validateName(lastname, "Lastname", 2, 15);

    const lastnamePrefix = lastname.trim().slice(0, 5).toLowerCase();
    const firstnamePrefix = firstname.trim().slice(0, 2).toLowerCase();

    this.studentEmail = `${lastnamePrefix}${firstnamePrefix}@essentialist.dev`;
  }

  public static create(firstname: string, lastname: string) {
    return new Student(firstname, lastname);
  }

  get email() {
    return this.studentEmail;
  }

  private validateName(
    name: string,
    nameType: string,
    min: number,
    max: number
  ) {
    if (!name) {
      throw new Error(`${nameType} is required`);
    }

    name = name.trim();

    if (name.length < min) {
      throw new Error(`${nameType} must be at least ${min} characters long`);
    }

    if (name.length > max) {
      throw new Error(`${nameType} must be at most ${max} characters long`);
    }

    if (!/^[a-zA-Z]+$/.test(name)) {
      throw new Error(`${nameType} must contain only letters`);
    }
  }
}
