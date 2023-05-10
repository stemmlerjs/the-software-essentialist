import { FirstName } from "./first-name";

describe("FirstName", () => {
  describe("when creating a first name", () => {
    it("returns a first name instance with value 'John'", () => {
      const firstName = FirstName.create("John");

      expect(firstName.value).toBe("John");
    });
  });
});
