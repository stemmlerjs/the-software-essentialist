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

  describe.each([["This is an error"]])(
    "when creating a failed Result with error %s",
    (error) => {
      it("returns a Result object with the error", () => {
        // Act
        const result = Result.failure(error);

        // Assert
        expect(result).toEqual(expect.objectContaining({ error }));
      });
    }
  );
});
