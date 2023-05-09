import { Student, InvalidStudentProps } from "./index";

describe("Student", () => {
  it("knows student's first name is 'John' and last name is 'Doe'", () => {
    // Arrange
    const firstName = "John";
    const lastName = "Doe";

    // Act
    const student = Student.create({ firstName, lastName });

    // Assert
    expect(student).toBeDefined();
    expect(student.value?.firstname).toBe(firstName);
    expect(student.value?.lastname).toBe(lastName);
  });

  it("knows student's email is 'fekkalo@essentialist.dev'", () => {
    // Arrange
    const firstName = "Loik";
    const lastName = "Fekkai";

    // Act
    const student = Student.create({ firstName, lastName });

    // Assert
    expect(student).toBeDefined();
    expect(student.value?.email).toBe("fekkalo@essentialist.dev");
  });

  describe("when student's first name is not provided", () => {
    it("returns an InvalidStudentProps object with a 'required' message for 'firstName'", () => {
      // Arrange
      const firstName = "";
      const lastName = "Doe";

      // Act
      const result = Student.create({
        firstName,
        lastName,
      });

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          firstName: expect.objectContaining({
            required: "firstName is required",
          }),
        })
      );
    });
  });

  describe("when student's first name is less than 2 characters long", () => {
    it("returns an InvalidStudentProps object with a 'min' message for 'firstName'", () => {
      // Arrange
      const firstName = "J";
      const lastName = "Doe";

      // Act
      const result = Student.create({
        firstName,
        lastName,
      });

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          firstName: expect.objectContaining({
            min: "firstName must be at least 2 characters long",
          }),
        })
      );
    });
  });

  describe("when student's first name is more than 10 characters long", () => {
    it("returns an InvalidStudentProps object with a 'max' message for 'firstName'", () => {
      // Arrange
      const firstName = "JohnJohnJohn";
      const lastName = "Doe";

      // Act
      const result = Student.create({
        firstName,
        lastName,
      });

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          firstName: expect.objectContaining({
            max: "firstName must be at most 10 characters long",
          }),
        })
      );
    });
  });

  describe("when student's first name contains non-alphabetic characters", () => {
    it("returns an InvalidStudentProps object with a 'letters' message for 'firstName'", () => {
      // Arrange
      const firstName = "John1";
      const lastName = "Doe";

      // Act
      const result = Student.create({
        firstName,
        lastName,
      });

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          firstName: expect.objectContaining({
            letters: "firstName must contain only letters",
          }),
        })
      );
    });
  });

  describe("when student's last name is not provided", () => {
    it("returns an InvalidStudentProps object with a 'required' message for 'lastName'", () => {
      // Arrange
      const firstName = "John";
      const lastName = "";

      // Act
      const result = Student.create({
        firstName,
        lastName,
      });

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          lastName: expect.objectContaining({
            required: "lastName is required",
          }),
        })
      );
    });
  });

  describe("when student's last name is less than 2 characters long", () => {
    it("returns an InvalidStudentProps object with a 'min' message for 'lastName'", () => {
      // Arrange
      const firstName = "John";
      const lastName = "D";

      // Act
      const result = Student.create({
        firstName,
        lastName,
      });

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          lastName: expect.objectContaining({
            min: "lastName must be at least 2 characters long",
          }),
        })
      );
    });
  });

  describe("when student's last name is more than 15 characters long", () => {
    it("returns an InvalidStudentProps object with a 'max' message for 'lastName'", () => {
      // Arrange
      const firstName = "John";
      const lastName = "DoeDoeDoeDoeDoeDoe";

      // Act
      const result = Student.create({
        firstName,
        lastName,
      });

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          lastName: expect.objectContaining({
            max: "lastName must be at most 15 characters long",
          }),
        })
      );
    });
  });

  describe("when student's last name contains non-alphabetic characters", () => {
    it("returns an InvalidStudentProps object with a 'letters' message for 'lastName'", () => {
      // Arrange
      const firstName = "John";
      const lastName = "Doe1";

      // Act
      const result = Student.create({
        firstName,
        lastName,
      });

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          lastName: expect.objectContaining({
            letters: "lastName must contain only letters",
          }),
        })
      );
    });
  });
});
