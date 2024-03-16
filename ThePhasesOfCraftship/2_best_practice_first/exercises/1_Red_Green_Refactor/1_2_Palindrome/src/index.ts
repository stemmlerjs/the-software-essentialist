export class PalindromeChecker {
  isAPalindrome(str: string): boolean {
    const reversed = str.split('').reverse().join('');
    if (str !== reversed) return false;
    return true;
  }
}
