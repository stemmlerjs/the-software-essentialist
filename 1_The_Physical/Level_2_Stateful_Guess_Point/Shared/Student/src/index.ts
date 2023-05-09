export class Student {
  constructor(
    public readonly firstname: string,
    public readonly lastname: string
  ) {
    if (!firstname) {
      throw new Error("Firstname is required");
    }

    if (!lastname) {
      throw new Error("Lastname is required");
    }
  }
}
