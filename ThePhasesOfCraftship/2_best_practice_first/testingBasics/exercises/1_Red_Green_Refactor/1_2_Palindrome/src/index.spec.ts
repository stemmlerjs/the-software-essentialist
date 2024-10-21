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

  test.each(["Was It A Rat I Saw", "Never Odd or Even", "1Never Odd or Even1"])(
    "should confirm phrase (%s) as palindrome ",
    (val) => {
      expect(isPalindrome(val)).toBe(true);
    }
  );

  test.each(["That's not a palindrome", "Never Odd or Even1"])(
    "should not confirm phrase (%s) as palindrome ",
    (val) => {
      expect(isPalindrome(val)).not.toBe(true);
    }
  );
});
