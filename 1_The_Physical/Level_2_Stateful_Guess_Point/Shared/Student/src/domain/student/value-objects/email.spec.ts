import { Email } from "./email";

describe("Email", () => {
  describe("when creating a new email", () => {
    it("returns a new email instance with 'fekkalo@essentialist.dev' as value", () => {
      const email = Email.create("fekkalo@essentialist.dev");

      expect(email.value).toBe("fekkalo@essentialist.dev");
    });
  });
});
