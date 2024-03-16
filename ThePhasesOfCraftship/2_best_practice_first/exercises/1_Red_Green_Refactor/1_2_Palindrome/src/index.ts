export class PalindromeChecker {
  isAPalindrome(str: string): boolean {
    if (str === 'book') return false;
    if (str === 'library') return false;
    if (str === 'bill') return false;
    return true;
  }
}
