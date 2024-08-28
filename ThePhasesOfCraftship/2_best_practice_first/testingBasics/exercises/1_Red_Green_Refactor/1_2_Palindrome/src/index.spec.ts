import { isPalindrome } from ".";

describe('palindrome checker', () => {
    
    it('should return true for an empty string', () => {
        expect(isPalindrome("")).toBe(true);
    });
    
    it('should return true for a single letter', () => {
        expect(isPalindrome("a")).toBe(true);
    });

    it('should return true for the word "mom"', () => {
        expect(isPalindrome("mom")).toBe(true);
    });
})