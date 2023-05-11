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

  it("id should be generated when creating new student", () => {
    // Arrange
    const firstName = "Loik";
    const lastName = "Fekkai";

    // Act
    const student = Student.create({ firstName, lastName });

    // Assert
    expect(student).toBeDefined();
    expect(student.value?.id).toBeDefined();
  });

  // Test event creation
  it("should create a new student created event", () => {
    // Arrange
    const firstName = "Loik";
    const lastName = "Fekkai";

    // Act
    const student = Student.create({ firstName, lastName });

    // Assert
    expect(student).toBeDefined();
    expect(student.value?.events).toBeDefined();
    expect(student.value?.events.length).toBe(1);
    expect(student.value?.events[0].name).toEqual("StudentCreated");
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

    it("should create a new first name updated event", () => {
      // Arrange
      const firstName = "John";
      const lastName = "Doe";
      const newFirstName = "Asterix";

      // Act
      const student = Student.create({ firstName, lastName });
      const updatedStudent = student.value?.updateFirstName(newFirstName);

      // Assert
      expect(updatedStudent).toBeDefined();
      expect(updatedStudent?.value?.events).toBeDefined();
      expect(updatedStudent?.value?.events.length).toBe(2);
      expect(updatedStudent?.value?.events[1].name).toEqual("FirstNameUpdated");
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
