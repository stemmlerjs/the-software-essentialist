import { FirstName, LastName } from "../value-objects";
import { Student } from "./student";

describe("Student", () => {
  describe.each([
    ["John", "Doe", "doejo@essentialist.dev"],
    ["Loik", "Fekkai", "fekkalo@essentialist.dev"],
  ])(
    "when given first name '%s' and last name '%s'",
    (firstName, lastName, email) => {
      it("should create a new student with correct properties", () => {
        // Act
        const student = Student.create({ firstName, lastName });

        // Assert
        expect(student).toBeDefined();
        expect(student.value?.firstName).toBe(firstName);
        expect(student.value?.lastName).toBe(lastName);
        expect(student.value?.email).toBe(email);
        expect(student.value?.id).toBeDefined();
        expect(student.value?.events).toBeDefined();
        expect(student.value?.events.length).toBe(1);
        expect(student.value?.events[0].name).toEqual("StudentCreated");
      });
    }
  );

  describe("when student's first name is invalid", () => {
    it("returns a StudentValidationError object with a 'required' message when first name is not provided", () => {
      // Arrange
      const firstName = "";
      const lastName = "Doe";

      // Act
      const student = Student.create({ firstName, lastName });

      // Assert
      expect(student.error).toEqual(
        expect.objectContaining({
          firstName: {
            required: "Firstname is required",
          },
        })
      );
    });

    it("returns a StudentValidationError object with a 'min' message when first name is less than 2 characters long", () => {
      // Arrange
      const firstName = "J";
      const lastName = "Doe";

      // Act
      const student = Student.create({ firstName, lastName });

      // Assert
      expect(student.error).toEqual(
        expect.objectContaining({
          firstName: {
            min: "Firstname must be at least 2 characters long",
          },
        })
      );
    });

    it("returns a StudentValidationError object with a 'max' message when first name is more than 10 characters long", () => {
      // Arrange
      const firstName = "JohnJohnJohn";
      const lastName = "Doe";

      // Act
      const student = Student.create({ firstName, lastName });

      // Assert
      expect(student.error).toEqual(
        expect.objectContaining({
          firstName: {
            max: "Firstname must be at most 10 characters long",
          },
        })
      );
    });

    it("returns a StudentValidationError object with a 'letters' message when first name contains non-letter characters", () => {
      // Arrange
      const firstName = "John1";
      const lastName = "Doe";

      // Act
      const student = Student.create({ firstName, lastName });

      // Assert
      expect(student.error).toEqual(
        expect.objectContaining({
          firstName: {
            letters: "Firstname must contain only letters",
          },
        })
      );
    });

    it("returns a StudentValidationError object with 'letters' and 'max' messages", () => {
      // Arrange
      const firstName = "John1JohnJohn";
      const lastName = "Doe";

      // Act
      const student = Student.create({ firstName, lastName });

      // Assert
      expect(student.error).toEqual(
        expect.objectContaining({
          firstName: {
            letters: "Firstname must contain only letters",
            max: "Firstname must be at most 10 characters long",
          },
        })
      );
    });
  });

  describe("when student's first name is updated", () => {
    describe("with a valid first name", () => {
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
        expect(updatedStudent?.value?.events[1].name).toEqual(
          "FirstNameUpdated"
        );
      });
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

    it("should create a new last name updated event", () => {
      // Arrange
      const firstName = "Joe";
      const lastName = "Doe";
      const newLastName = "Dalton";

      // Act
      const student = Student.create({ firstName, lastName });
      const updatedStudent = student.value?.updateLastName(newLastName);

      // Assert
      expect(updatedStudent).toBeDefined();
      expect(updatedStudent?.value?.events).toBeDefined();
      expect(updatedStudent?.value?.events.length).toBe(2);
      expect(updatedStudent?.value?.events[1].name).toEqual("LastNameUpdated");
    });
  });
});
