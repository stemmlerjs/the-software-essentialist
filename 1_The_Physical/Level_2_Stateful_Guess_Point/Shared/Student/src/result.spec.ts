import { Result } from "./result";

describe("Result", () => {
  describe.each([["This is a value"], [{ foo: "bar" }]])(
    "when creating a successful Result with value %s",
    (value) => {
      it("returns a Result object with the value", () => {
        // Act
        const result = Result.success(value);

        // Assert
        expect(result).toEqual(expect.objectContaining({ value }));
      });
    }
  );

  describe.each([
    ["This is an error"],
    [{ min: "This is an error about min length" }],
  ])("when creating a failed Result with error %s", (error) => {
    it("returns a Result object with the error", () => {
      // Act
      const result = Result.failure(error);

      // Assert
      expect(result).toEqual(expect.objectContaining({ error }));
    });
  });

  describe("when checking if a Result is successful", () => {
    describe("when the Result is created from 'success' method", () => {
      it("returns true", () => {
        // Arrange
        const result = Result.success("This is a value");

        // Act
        const isSuccess = result.isSuccess();

        // Assert
        expect(isSuccess).toBe(true);
      });
    });

    describe("when the Result is created from 'failure' method", () => {
      it("returns false", () => {
        // Arrange
        const result = Result.failure("This is an error");

        // Act
        const isSuccess = result.isSuccess();

        // Assert
        expect(isSuccess).toBe(false);
      });
    });
  });
});
