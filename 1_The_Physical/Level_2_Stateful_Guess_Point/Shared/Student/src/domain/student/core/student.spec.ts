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

  describe.each([
    ["", "Doe", { required: "Firstname is required" }],
    ["L", "Fekkai", { min: "Firstname must be at least 2 characters long" }],
    [
      "JohnJohnJohn",
      "Doe",
      { max: "Firstname must be at most 10 characters long" },
    ],
    ["John1", "Doe", { letters: "Firstname must contain only letters" }],
    [
      "JohnJohnJohn1",
      "Doe",
      {
        letters: "Firstname must contain only letters",
        max: "Firstname must be at most 10 characters long",
      },
    ],
  ])(
    "when given first name '%s' and last name '%s'",
    (firstName, lastName, expectedError) => {
      it(`should return a FirstNameValidationError object with a '${JSON.stringify(
        expectedError
      )}' message`, () => {
        // Act
        const student = Student.create({ firstName, lastName });

        // Assert
        expect(student.error).toEqual(
          expect.objectContaining({
            firstName: expectedError,
          })
        );
      });
    }
  );

  describe.each([
    ["John", "", { required: "Lastname is required" }],
    ["John", "D", { min: "Lastname must be at least 2 characters long" }],
    [
      "John",
      "TravoltaTravoltaTravolta",
      { max: "Lastname must be at most 15 characters long" },
    ],
    ["John", "Doe1", { letters: "Lastname must contain only letters" }],
    [
      "John",
      "TravoltaTravoltaTravolta1",
      {
        letters: "Lastname must contain only letters",
        max: "Lastname must be at most 15 characters long",
      },
    ],
  ])(
    "when given first name '%s' and last name '%s'",
    (firstName, lastName, expectedError) => {
      it(`should return a LastNameValidationError object with a '${JSON.stringify(
        expectedError
      )}' message`, () => {
        // Act
        const student = Student.create({ firstName, lastName });

        // Assert
        expect(student.error).toEqual(
          expect.objectContaining({
            lastName: expectedError,
          })
        );
      });
    }
  );

  describe.each([
    [
      "",
      "",
      {
        firstName: {
          required: "Firstname is required",
        },
        lastName: {
          required: "Lastname is required",
        },
      },
    ],
    [
      "L",
      "D",
      {
        firstName: {
          min: "Firstname must be at least 2 characters long",
        },
        lastName: {
          min: "Lastname must be at least 2 characters long",
        },
      },
    ],
    [
      "JohnJohnJohn",
      "TravoltaTravoltaTravolta",
      {
        firstName: {
          max: "Firstname must be at most 10 characters long",
        },
        lastName: {
          max: "Lastname must be at most 15 characters long",
        },
      },
    ],
    [
      "John1",
      "Doe1",
      {
        firstName: {
          letters: "Firstname must contain only letters",
        },
        lastName: {
          letters: "Lastname must contain only letters",
        },
      },
    ],
    [
      "1",
      "1",
      {
        firstName: {
          letters: "Firstname must contain only letters",
          min: "Firstname must be at least 2 characters long",
        },
        lastName: {
          letters: "Lastname must contain only letters",
          min: "Lastname must be at least 2 characters long",
        },
      },
    ],
  ])(
    "when given first name '%s' and last name '%s'",
    (firstName, lastName, expectedError) => {
      it(`should return a FirstNameValidationError object with a '${JSON.stringify(
        expectedError
      )}' message`, () => {
        // Act
        const student = Student.create({ firstName, lastName });

        // Assert
        expect(student.error).toEqual(
          expect.objectContaining({
            firstName: expectedError.firstName,
            lastName: expectedError.lastName,
          })
        );
      });
    }
  );

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
