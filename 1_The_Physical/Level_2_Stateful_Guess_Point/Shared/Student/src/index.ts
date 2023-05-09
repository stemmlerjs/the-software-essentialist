export class Student {
  constructor(
    public readonly firstname: string,
    public readonly lastname: string
  ) {
    this.validateFirstname(firstname);

    if (!lastname) {
      throw new Error("Lastname is required");
    }
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
}
