/*
*  "mom" returns true
    "Mom" returns true
    "MoM" returns true
    "Momx" returns false
    "xMomx" returns true
    "Was It A Rat I Saw" returns true
    "Never Odd or Even" returns true
    "Never Odd or Even1" returns false
    "1Never Odd or Even1" returns true
*
* */
import { isPalindrome } from "./index";

describe('palindrome checker', () => {
    it.each([
        'mom',
        'Mom',
        'xMomx',
        'Was It A Rat I Saw',
        'Never Odd or Even',
        '1Never Odd or Even1',
    ])('treats "%s" to be a palindrome', (input) => {
        expect(isPalindrome(input)).toBe(true);
    });

    it.each([
        'Momx',
        'Never Odd or Even1',
    ])('treats "%s" not to be a palindrome', (input) => {
        expect(isPalindrome(input)).toBe(false);
    });
});