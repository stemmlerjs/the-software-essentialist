export class Student {
  constructor(
    public readonly firstname: string,
    public readonly lastname: string
  ) {
    this.validateName(firstname, "Firstname", 2, 10);
    this.validateName(lastname, "Lastname", 2, 15);
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
  }
}
