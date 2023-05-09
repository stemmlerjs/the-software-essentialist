import { Student } from "./index";

describe("Student", () => {
  it("knows student's first name is 'John' and last name is 'Doe'", () => {
    // Arrange
    const firstName = "John";
    const lastName = "Doe";

    // Act
    const student = Student.create(firstName, lastName);

    // Assert
    expect(student).toBeDefined();
    expect(student.firstname).toBe(firstName);
    expect(student.lastname).toBe(lastName);
  });

  it("knows student's email is 'fekkalo@essentialist.dev'", () => {
    // Arrange
    const firstName = "Loik";
    const lastName = "Fekkai";

    // Act
    const student = Student.create(firstName, lastName);

    // Assert
    expect(student).toBeDefined();
    expect(student.email).toBe("fekkalo@essentialist.dev");
  });

  describe("when student's first name is not provided", () => {
    it("throws an error", () => {
      // Arrange
      const firstName = "";
      const lastName = "Doe";

      // Act
      const student = () => Student.create(firstName, lastName);

      // Assert
      expect(student).toThrowError("Firstname is required");
    });
  });

  describe("when student's first name is less than 2 characters long", () => {
    it("throws an error", () => {
      // Arrange
      const firstName = "J";
      const lastName = "Doe";

      // Act
      const student = () => Student.create(firstName, lastName);

      // Assert
      expect(student).toThrowError(
        "Firstname must be at least 2 characters long"
      );
    });
  });

  describe("when student's first name is more than 10 characters long", () => {
    it("throws an error", () => {
      // Arrange
      const firstName = "JohnJohnJohn";
      const lastName = "Doe";

      // Act
      const student = () => Student.create(firstName, lastName);

      // Assert
      expect(student).toThrowError(
        "Firstname must be at most 10 characters long"
      );
    });
  });

  describe("when student's first name contains non-alphabetic characters", () => {
    it("throws an error", () => {
      // Arrange
      const firstName = "John1";
      const lastName = "Doe";

      // Act
      const student = () => Student.create(firstName, lastName);

      // Assert
      expect(student).toThrowError("Firstname must contain only letters");
    });
  });

  describe("when student's last name is not provided", () => {
    it("throws an error", () => {
      // Arrange
      const firstName = "John";
      const lastName = "";

      // Act
      const student = () => Student.create(firstName, lastName);

      // Assert
      expect(student).toThrowError("Lastname is required");
    });
  });

  describe("when student's last name is less than 2 characters long", () => {
    it("throws an error", () => {
      // Arrange
      const firstName = "John";
      const lastName = "D";

      // Act
      const student = () => Student.create(firstName, lastName);

      // Assert
      expect(student).toThrowError(
        "Lastname must be at least 2 characters long"
      );
    });
  });

  describe("when student's last name is more than 15 characters long", () => {
    it("throws an error", () => {
      // Arrange
      const firstName = "John";
      const lastName = "DoeDoeDoeDoeDoeDoe";

      // Act
      const student = () => Student.create(firstName, lastName);

      // Assert
      expect(student).toThrowError(
        "Lastname must be at most 15 characters long"
      );
    });
  });

  describe("when student's last name contains non-alphabetic characters", () => {
    it("throws an error", () => {
      // Arrange
      const firstName = "John";
      const lastName = "Doe1";

      // Act
      const student = () => Student.create(firstName, lastName);

      // Assert
      expect(student).toThrowError("Lastname must contain only letters");
    });
  });
});
