export class Student {
  constructor(
    public readonly firstname: string,
    public readonly lastname: string
  ) {
    this.validateFirstname(firstname);
    this.validateLastname(lastname);
  }

  private validateFirstname(firstname: string) {
    if (!firstname) {
      throw new Error("Firstname is required");
    }

    firstname = firstname.trim();

    if (firstname.length < 2) {
      throw new Error("Firstname must be at least 2 characters long");
    }

    if (firstname.length > 10) {
      throw new Error("Firstname must be at most 10 characters long");
    }
  }

  private validateLastname(lastname: string) {
    if (!lastname) {
      throw new Error("Lastname is required");
    }

    lastname = lastname.trim();

    if (lastname.length < 2) {
      throw new Error("Lastname must be at least 2 characters long");
    }

    if (lastname.length > 15) {
      throw new Error("Lastname must be at most 15 characters long");
    }
  }
}
