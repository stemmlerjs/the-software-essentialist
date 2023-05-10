import { LastName } from "./last-name";

describe("LastName", () => {
  describe("when creating a last name", () => {
    it("returns a last name instance with value 'Doe'", () => {
      // Arrange
      const firstName = "Doe";

      // Act
      const result = LastName.create(firstName);

      // Assert
      expect(result.value?.value).toBe(firstName);
    });
  });

  describe("when student's last name is not provided", () => {
    it("returns a LastNameValidationError object with a 'required' message", () => {
      // Arrange
      const firstName = "";

      // Act
      const result = LastName.create(firstName);

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          required: "Lastname is required",
        })
      );
    });
  });

  describe("when student's last name is less than 2 characters long", () => {
    it("returns a LastNameValidationError object with a 'min' message", () => {
      // Arrange
      const firstName = "D";

      // Act
      const result = LastName.create(firstName);

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          min: "Lastname must be at least 2 characters long",
        })
      );
    });
  });

  describe("when student's last name is more than 15 characters long", () => {
    it("returns a LastNameValidationError object with a 'max' message", () => {
      // Arrange
      const firstName = "DoeDoeDoeDoeDoeDoe";

      // Act
      const result = LastName.create(firstName);

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          max: "Lastname must be at most 15 characters long",
        })
      );
    });
  });

  describe("when student's last name contains non-alphabetic characters", () => {
    it("returns a LastNameValidationError object with a 'letters' message", () => {
      // Arrange
      const firstName = "Doe1";

      // Act
      const result = LastName.create(firstName);

      // Assert
      expect(result.error).toEqual(
        expect.objectContaining({
          letters: "Lastname must contain only letters",
        })
      );
    });
  });
});
