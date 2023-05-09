export class Student {
  constructor(
    public readonly firstname: string,
    public readonly lastname: string
  ) {
    if (!firstname) {
      throw new Error("Firstname is required");
    }

    firstname = firstname.trim();

    if (firstname.length < 2) {
      throw new Error("Firstname must be at least 2 characters long");
    }

    if (!lastname) {
      throw new Error("Lastname is required");
    }
  }
}
