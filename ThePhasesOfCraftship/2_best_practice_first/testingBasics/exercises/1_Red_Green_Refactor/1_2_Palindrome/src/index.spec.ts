import { isPalindrome } from ".";

describe('palindrome checker', () => {
    
    const testCases = [
    
    // Special cases
    ["", true],               // Empty string
    ["a", true],              // Single letter
    ["Mom", true],            // Casing should be ignored
    ["  m o  m ", true],     // Whitespace should be ignored

    // Palindromes
    ["mom", true],           
    ["MoM", true],
    ["xMomx", true],
    ["1Never Odd or Even1", true],
    ["Was It A Rat I Saw", true], 
    ["Never Odd or Even", true], 

    // Non-palindromes
    ["bill", false],
    ["Momx", false],
    ["Never Odd or Even1", false],
    ] as const;

    it.each(testCases)(
    'should return %p for the string %p',
    (input, expected) => {
        expect(isPalindrome(input)).toBe(expected);
    }
    );
})