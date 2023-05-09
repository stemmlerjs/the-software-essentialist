import { Result } from "./result";

describe("Result", () => {
  describe("when creating a successful Result with 'This is a value' as value", () => {
    it("returns a Result object with a value", () => {
      // Arrange
      const value = "This is a value";

      // Act
      const result = Result.success(value);

      // Assert
      expect(result).toEqual(expect.objectContaining({ value }));
    });
  });
});
