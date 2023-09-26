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
    it('treats "mom" to be a palindrome', () => {
        expect(isPalindrome("mom")).toBe(true);
    });

    it('treats "Mom" to be a palindrome', () => {
        expect(isPalindrome("Mom")).toBe(true);
    });

    it('treats "Momx" not to be a palindrome', () => {
        expect(isPalindrome("Momx")).toBe(false);
    });

    it('treats "xMomx" to be a palindrome', () => {
        expect(isPalindrome("xMomx")).toBe(true);
    });

    it('treats "Was It A Rat I Saw" to be a palindrome', () => {
        expect(isPalindrome("Was It A Rat I Saw")).toBe(true);
    });
});