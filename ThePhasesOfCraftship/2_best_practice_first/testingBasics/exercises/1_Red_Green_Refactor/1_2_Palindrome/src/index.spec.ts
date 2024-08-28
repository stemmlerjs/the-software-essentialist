import { isPalindrome } from ".";

describe('palindrome checker', () => {
    it('should return true for an empty string', () => {
        expect(isPalindrome("")).toBe(true);
      });
})