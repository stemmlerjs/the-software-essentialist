import { isPalindrome } from "./index";

describe("palindrome checker", () => {
  test("should validate 'mom' as palindrome", () => {
    expect(isPalindrome("mom")).toBeTruthy();
  });
});
