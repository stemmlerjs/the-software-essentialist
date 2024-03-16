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

  it('should be able to verify that "bill" is an invalid palindrome', () => {
    //given
    const word = 'bill';

    //when
    const result = palindromeChecker.isAPalindrome(word);

    //then
    expect(result).toBeFalsy();
  });

  it('should be able to verify that "library" is an invalid palindrome', () => {
    //given
    const word = 'library';

    //when
    const result = palindromeChecker.isAPalindrome(word);

    //then
    expect(result).toBeFalsy();
  });

  it('should be able to verify that "book" is an invalid palindrome', () => {
    //given
    const word = 'book';

    //when
    const result = palindromeChecker.isAPalindrome(word);

    //then
    expect(result).toBeFalsy();
  });
});
