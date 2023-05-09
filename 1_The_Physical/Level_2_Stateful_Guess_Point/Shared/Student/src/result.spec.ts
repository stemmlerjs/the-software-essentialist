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

  describe.each([
    ["success", "This is a value", true, false],
    ["failure", "This is an error", false, true],
  ])(
    "when checking if a Result is %s",
    (type, message, expectedSuccess, expectedFailure) => {
      const result =
        type === "success" ? Result.success(message) : Result.failure(message);

      it(`returns ${expectedSuccess} for isSuccess method`, () => {
        expect(result.isSuccess()).toBe(expectedSuccess);
      });

      it(`returns ${expectedFailure} for isFailure method`, () => {
        expect(result.isFailure()).toBe(expectedFailure);
      });
    }
  );
});
