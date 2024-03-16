import { PalindromeChecker } from './index';

describe('palindrome checker', () => {
  let palindromeChecker: PalindromeChecker;

  beforeEach(() => {
    palindromeChecker = new PalindromeChecker();
  });

  it.each(['mom', 'wow'])(
    'should be able to verify that the word "%s" is a valid palindrome',
    (word) => {
      const result = palindromeChecker.isAPalindrome(word);

      expect(result).toBeTruthy();
    }
  );

  it.each(['Mom', 'DAD', 'WoW'])(
    'should be able to verify that the word "%s" with is a valid palindrome even if casing is off',
    (word) => {
      const result = palindromeChecker.isAPalindrome(word);

      expect(result).toBeTruthy();
    }
  );

  it.each(['bill', 'library', 'book'])(
    'should be able to verify that the word "%s" is an invalid palindrome',
    (word) => {
      const result = palindromeChecker.isAPalindrome(word);

      expect(result).toBeFalsy();
    }
  );

  it.each(['Was It A Rat I Saw'])(
    'should be able to verify that the phrase "%s" is an valid palindrome',
    (phrase) => {
      const result = palindromeChecker.isAPalindrome(phrase);

      expect(result).toBeTruthy();
    }
  );
});
