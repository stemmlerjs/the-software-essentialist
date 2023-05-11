import { Email } from "./email";

describe("Email", () => {
  describe("when creating a new email", () => {
    it("returns a new email instance with 'fekkalo@essentialist.dev' as value", () => {
      const email = Email.create("fekkalo@essentialist.dev");

      expect(email.value?.value).toBe("fekkalo@essentialist.dev");
    });

    describe("when email is not provided", () => {
      it("returns an EmailValidationError object with a 'required' message", () => {
        // Arrange
        const email = "";

        // Act
        const result = Email.create(email);

        // Assert
        expect(result.error).toEqual(
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

  describe("when generating a new email", () => {
    it("returns a new email instance with 'essentialist.dev' as domain", () => {
      // Arrange
      const local = "fekkailoik";

      // Act
      const result = Email.generate({
        local,
      });

      // Assert
      expect(result.value?.value).toBe(`${local}@${Email.domain}`);
    });
  });
});
