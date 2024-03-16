import { PalindromeChecker } from './index';

describe('palindrome checker', () => {
  it('should be able to verify that "mom" is a valid palindrome', () => {
    //given
    const palindromeChecker = new PalindromeChecker();
    const word = 'mom';

    //when
    const result = palindromeChecker.isAPalindrome(word);

    //then
    expect(result).toBeTruthy();
  });

  it('should be able to verify that "wow" is a valid palindrome', () => {
    //given
    const palindromeChecker = new PalindromeChecker();
    const word = 'wow';

    //when
    const result = palindromeChecker.isAPalindrome(word);

    //then
    expect(result).toBeTruthy();
  });

  it('should be able to verify that "bill" is a invalid palindrome', () => {
    //given
    const palindromeChecker = new PalindromeChecker();
    const word = 'bill';

    //when
    const result = palindromeChecker.isAPalindrome(word);

    //then
    expect(result).toBeFalsy();
  });
});
