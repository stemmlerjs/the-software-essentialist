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
});
