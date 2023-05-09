import { Student } from "./index";

describe("Student", () => {
  it("knows student's first name is John", () => {
    // Arrange
    const firstName = "John";

    // Act
    const student = new Student(firstName);

    // Assert
    expect(student).toBeDefined();
    expect(student.firstname).toBe(firstName);
  });
});
