import { isPalindrome } from "./index";

describe("palindrome checker", () => {
  test("should validate 'mom' as palindrome", () => {
    expect(isPalindrome("mom")).toBeTruthy();
  });

  test.each(["Mom", "MOM"])(
    "should validate uppercase single word as palindrome",
    (val) => {
      expect(isPalindrome(val)).toBeTruthy();
    }
  );
});
