import { isPalindrome } from "./index";

describe("palindrome checker", () => {
  test("should validate 'mom' as palindrome", () => {
    expect(isPalindrome("mom")).toBeTruthy();
  });

  test("should validate 'Mom' as palindrome", () => {
    expect(isPalindrome("Mom")).toBeTruthy();
  });

  test("should validate 'MoM as palindrome", () => {
    expect(isPalindrome("MoM")).toBeTruthy();
  });
});
