import { palindromeChecker } from './index';

describe('palindrome checker', () => {

  // "mom" returns true
  // "Mom" returns true
  // "MoM" returns true
  // "Momx" returns false
  // "xMomx" returns true
  // "Was It A Rat I Saw" returns true
  // "Never Odd or Even" returns true
  // "Never Odd or Even1" returns false 
  // "1Never Odd or Even1" returns true

  describe('returns true for palindrom str', () => {
    it.each(['mom', 'MoM'])('knows that %s is a palindrome', (str: string) => {
      expect(palindromeChecker(str)).toBe(true);
    });
  });

  describe('approves palindroms with different letter cases', () => {
    it.each(['Mom', 'Noon', 'xMomx'])('knows that %s is a palindrome', (str: string) => {
      expect(palindromeChecker(str)).toBe(true);
    });
  });

  describe('returns false for non palindromes', () => {
    it.each(['Momx', 'bill', 'Never Odd or Even1'])
    ('knows that %s is not a palindrome', (str: string) => {
      expect(palindromeChecker(str)).toBe(false);
    });
  });

  describe('ignores string spaces', () => {
    it.each(['Was It A Rat I Saw', 'Never Odd or Even', '1Never Odd or Even1'])
    ('knows that %s is a palindrome', (str: string) => {
      expect(palindromeChecker(str)).toBe(true);
    });
  });
  
});
