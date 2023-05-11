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

  describe("when combining multiple results", () => {
    describe("and all results are successful", () => {
      it("returns a Result object with the combined values", () => {
        // Arrange
        const firstName = Result.success({
          firstName: "John",
        });
        const lastName = Result.success({
          lastName: "Doe",
        });

        // Act
        const result = Result.combine(firstName, lastName);

        // Assert
        expect(result.value).toEqual(
          expect.arrayContaining([
            {
              firstName: "John",
            },
            {
              lastName: "Doe",
            },
          ])
        );
      });
    });

    describe("and at least one result is a failure", () => {
      it("returns a Result object with the combined errors", () => {
        // Arrange
        const firstName = Result.success({
          firstName: "John",
        });
        const lastName = Result.failure({
          lastName: "Lastname is required",
        });

        // Act
        const result = Result.combine(firstName, lastName);

        // Assert
        expect(result.error).toEqual(
          expect.arrayContaining([
            {
              lastName: "Lastname is required",
            },
          ])
        );
      });
    });

    describe("and all results are failures", () => {
      it("returns a Result object with the combined errors", () => {
        // Arrange
        const firstName = Result.failure({
          firstName: "Firstname is required",
        });
        const lastName = Result.failure({
          lastName: "Lastname is required",
        });

        // Act
        const result = Result.combine(firstName, lastName);

        // Assert
        expect(result.error).toEqual(
          expect.arrayContaining([
            {
              firstName: "Firstname is required",
            },
            {
              lastName: "Lastname is required",
            },
          ])
        );
      });
    });
  });

  describe("when flatMapping a Result", () => {
    describe("and the Result is successful", () => {
      it("returns a Result object with the mapped value", () => {
        // Arrange
        const result = Result.success("This is a value");

        // Act
        const mappedResult = result.flatMap((value) =>
          Result.success(`Mapped ${value}`)
        );

        // Assert
        expect(mappedResult).toEqual(
          expect.objectContaining({
            value: "Mapped This is a value",
          })
        );
      });
    });

    describe("and the Result is a failure", () => {
      it("returns a Result object with the original error", () => {
        // Arrange
        const result = Result.failure("This is an error");

        // Act
        const mappedResult = result.flatMap((value) =>
          Result.success(`Mapped ${value}`)
        );

        // Assert
        expect(mappedResult).toEqual(
          expect.objectContaining({
            error: "This is an error",
          })
        );
      });
    });
  });
});
