import { TextUtil } from "./textUtil";

describe("TextUtil", () => {
  describe("createRandomText", () => {
    it("should return a string with the given length", () => {
      const length = 10;
      const randomText = TextUtil.createRandomText(length);

      expect(randomText).toHaveLength(length);
    });

    it("should generate a random text containing characters from the charset", () => {
      const randomText = TextUtil.createRandomText(10);

      expect(randomText).toMatch(/[a-zA-Z0-9!@#$%^&*()\-=_+]{10}/);
    });
  });

  describe("isBetweenLength", () => {
    it("should return true when the text length is between minLength and maxLength (inclusive)", () => {
      const text = "Hello, world!";
      const minLength = 5;
      const maxLength = 20;

      const isValid = TextUtil.isBetweenLength(text, minLength, maxLength);

      expect(isValid).toBe(true);
    });

    it("should return false when the text length is less than minLength", () => {
      const text = "Hi";
      const minLength = 5;
      const maxLength = 20;

      const isValid = TextUtil.isBetweenLength(text, minLength, maxLength);

      expect(isValid).toBe(false);
    });

    it("should return false when the text length is greater than maxLength", () => {
      const text = "A very long string that exceeds the maximum length";
      const minLength = 5;
      const maxLength = 20;

      const isValid = TextUtil.isBetweenLength(text, minLength, maxLength);

      expect(isValid).toBe(false);
    });
  });
});
