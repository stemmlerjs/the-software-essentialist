import { Student } from "./index";

describe("Student", () => {
  it("knows student's first name is 'John' and last name is 'Doe'", () => {
    // Arrange
    const firstName = "John";
    const lastName = "Doe";

    // Act
    const student = new Student(firstName, lastName);

    // Assert
    expect(student).toBeDefined();
    expect(student.firstname).toBe(firstName);
    expect(student.lastname).toBe(lastName);
  });
});
