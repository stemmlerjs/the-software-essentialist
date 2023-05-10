import { FirstName } from "./first-name";

describe("FirstName", () => {
  describe("when creating a first name", () => {
    it("returns a first name instance with value 'John'", () => {
      // Arrange
      const firstName = "John";

      // Act
      const result = FirstName.create(firstName);

      // Assert
      expect(result.value?.value).toBe(firstName);
    });
  });

  describe("when student's first name is not provided", () => {
    it("returns a FirstNameValidationError object with a 'required' message", () => {
      // Arrange
      const firstName = "";

      // Act
      const result = FirstName.create(firstName);

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          required: "Firstname is required",
        })
      );
    });
  });

  describe("when student's first name is less than 2 characters long", () => {
    it("returns a FirstNameValidationError object with a 'min' message", () => {
      // Arrange
      const firstName = "J";

      // Act
      const result = FirstName.create(firstName);

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          min: "Firstname must be at least 2 characters long",
        })
      );
    });
  });

  describe("when student's first name is more than 10 characters long", () => {
    it("returns a FirstNameValidationError object with a 'max' message", () => {
      // Arrange
      const firstName = "JohnJohnJohn";

      // Act
      const result = FirstName.create(firstName);

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          max: "Firstname must be at most 10 characters long",
        })
      );
    });
  });

  describe("when student's first name contains non-alphabetic characters", () => {
    it("returns a FirstNameValidationError object with a 'letters' message", () => {
      // Arrange
      const firstName = "John1";

      // Act
      const result = FirstName.create(firstName);

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          letters: "Firstname must contain only letters",
        })
      );
    });
  });
});
