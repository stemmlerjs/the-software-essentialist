import { Result } from "./result";

describe("Result", () => {
  describe("when creating a successful Result", () => {
    describe("with 'This is a value' as value", () => {
      it("returns a Result object with a value", () => {
        // Arrange
        const value = "This is a value";

        // Act
        const result = Result.success(value);

        // Assert
        expect(result).toEqual(expect.objectContaining({ value }));
      });
    });

    describe("with a custom object as value", () => {
      it("returns a Result object with a value", () => {
        // Arrange
        const value = { foo: "bar" };

        // Act
        const result = Result.success(value);

        // Assert
        expect(result).toEqual(expect.objectContaining({ value }));
      });
    });
  });
});
