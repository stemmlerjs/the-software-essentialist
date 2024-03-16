import { PalindromeChecker } from './index';

describe('palindrome checker', () => {
  let palindromeChecker: PalindromeChecker;

  beforeEach(() => {
    palindromeChecker = new PalindromeChecker();
  });

  it('should be able to verify that "mom" is a valid palindrome', () => {
    //given
    const word = 'mom';

    //when
    const result = palindromeChecker.isAPalindrome(word);

    //then
    expect(result).toBeTruthy();
  });

  it('should be able to verify that "wow" is a valid palindrome', () => {
    //given
    const word = 'wow';

    //when
    const result = palindromeChecker.isAPalindrome(word);

    //then
    expect(result).toBeTruthy();
  });

  it.each(['bill', 'library', 'book'])(
    'should be able to verify that the word "%s" is an invalid palindrome',
    (word) => {
      const result = palindromeChecker.isAPalindrome(word);

      expect(result).toBeFalsy();
    }
  );

  it('should be able to verify that "Mom" is a valid palindrome', () => {
    //given
    const word = 'Mom';

    //when
    const result = palindromeChecker.isAPalindrome(word);

    //then
    expect(result).toBeTruthy();
  });
});
