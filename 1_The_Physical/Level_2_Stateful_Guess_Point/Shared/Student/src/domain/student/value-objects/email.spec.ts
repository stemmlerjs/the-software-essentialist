import { Email } from "./email";

describe("Email", () => {
  describe("when creating a new email", () => {
    it("returns a new email instance with 'fekkalo@essentialist.dev' as value", () => {
      const email = Email.create("fekkalo@essentialist.dev");

      expect(email.value).toBe("fekkalo@essentialist.dev");
    });

    describe("when email is not provided", () => {
      it("returns an EmailValidationError object with a 'required' message", () => {
        const email = Email.create("");

        expect(email.error).toEqual(
          expect.objectContaining({
            required: "Email is required",
          })
        );
      });
    });

    describe("when domain email is not 'essentialist.dev'", () => {
      it("returns an EmailValidationError object with a 'domain' message", () => {
        // Arrange
        const email = "toto@gmail.com";

        // Act
        const result = Email.create(email);

        // Assert
        expect(result.error).toEqual(
          expect.objectContaining({
            domain: "Email must be from 'essentialist.dev' domain",
          })
        );
      });
    });
  });
});
