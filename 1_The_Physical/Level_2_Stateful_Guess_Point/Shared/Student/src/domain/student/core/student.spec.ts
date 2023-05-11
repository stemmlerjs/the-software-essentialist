import { Student } from "./student";

describe("Student", () => {
  it("knows student's first name is 'John' and last name is 'Doe'", () => {
    // Arrange
    const firstName = "John";
    const lastName = "Doe";

    // Act
    const student = Student.create({ firstName, lastName });

    // Assert
    expect(student).toBeDefined();
    expect(student.value?.firstName).toBe(firstName);
    expect(student.value?.lastName).toBe(lastName);
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

  describe("when student's first name is updated", () => {
    it("returns a new student with first name 'Asterix' instead of 'Joe', last name 'Doe' and email 'doeas@essentialist.dev'", () => {
      // Arrange
      const firstName = "John";
      const lastName = "Doe";
      const newFirstName = "Asterix";

      // Act
      const student = Student.create({ firstName, lastName });
      const updatedStudent = student.value?.updateFirstName(newFirstName);

      // Assert
      expect(updatedStudent).toBeDefined();
      expect(updatedStudent?.value?.firstName).toBe(newFirstName);
      expect(updatedStudent?.value?.lastName).toBe(lastName);
      expect(updatedStudent?.value?.email).toBe("doeas@essentialist.dev");
    });
  });

  describe("when student's last name is updated", () => {
    it("returns a new student with first name 'Joe', last name 'Dalton' and email 'daltojo@essentialist.dev'", () => {
      // Arrange
      const firstName = "Joe";
      const lastName = "Doe";
      const newLastName = "Dalton";

      // Act
      const student = Student.create({ firstName, lastName });
      const updatedStudent = student.value?.updateLastName(newLastName);

      // Assert
      expect(updatedStudent).toBeDefined();
      expect(updatedStudent?.value?.firstName).toBe(firstName);
      expect(updatedStudent?.value?.lastName).toBe(newLastName);
      expect(updatedStudent?.value?.email).toBe("daltojo@essentialist.dev");
    });
  });
});
