export class PalindromeChecker {
  isAPalindrome(str: string): boolean {
    const reversed = str.split('').reverse().join('');
    if (str.toLowerCase() !== reversed.toLowerCase()) return false;
    return true;
  }
}
