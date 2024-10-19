import { isPalindrome } from "./index";

describe("palindrome checker", () => {
  test("should confirm that 'mom' is palindrome", () => {
    expect(isPalindrome("mom")).toBeTruthy();
  });

  test.each(["Mom", "MoM"])(
    "should confirm %s is palindrome when is single uppercase word",
    (val) => {
      expect(isPalindrome(val)).toBeTruthy();
    }
  );

  test.each(["Momx", "rocket", "JohnDeep"])(
    "should not confirm %s as palindrome",
    (val) => {
      expect(isPalindrome(val)).toBe(false);
    }
  );
});
