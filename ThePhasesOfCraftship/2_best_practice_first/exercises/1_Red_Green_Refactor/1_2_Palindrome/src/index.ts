export class PalindromeChecker {
  isAPalindrome(str: string): boolean {
    const reversed = str.split('').reverse().join('');
    if (
      str.toLowerCase().split(' ').join('') !==
      reversed.toLowerCase().split(' ').join('')
    )
      return false;
    return true;
  }
}
