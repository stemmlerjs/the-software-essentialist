import { isPalindrome } from ".";

describe('palindrome checker', () => {
    
    const testCases = [
    
    // Special cases
    ["", true],               // Empty string
    ["a", true],              // Single letter
    ["Mom", true],            // Casing should be ignored
    ["  m o  m ", true],     // Whitespace should be ignored

    // Palindromes
    ["mom", true],            // Simple palindrome
    ["MoM", true],
    ["xMomx", true],
    ["Was It A Rat I Saw", true], // Phrase with spaces and mixed casing
    ["Never Odd or Even", true], // Another phrase with spaces and mixed casing

    // Non-palindromes
    ["bill", false],          // Simple non-palindrome
    ["Momx", false],          // Simple non-palindrome
    ["Never Odd or Even1", false],          // Simple non-palindrome
    ] as const;

    it.each(testCases)(
    'should return %p for the string %p',
    (input, expected) => {
        expect(isPalindrome(input)).toBe(expected);
    }
    );
})