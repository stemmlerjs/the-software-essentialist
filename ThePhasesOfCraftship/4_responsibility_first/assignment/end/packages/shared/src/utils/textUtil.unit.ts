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
});
