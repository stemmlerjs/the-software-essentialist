function reverseString(str: string) {
  return str.split('').reverse().join('');
}

function stripSpaces(str: string) {
  return str.split(' ').join('');
}

function caseInsensitiveEquals(str1: string, str2: string) {
  return str1.toLowerCase() === str2.toLowerCase();
}

export class PalindromeChecker {
  isAPalindrome(str: string): boolean {
    const reversed = reverseString(str);

    return caseInsensitiveEquals(stripSpaces(str), stripSpaces(reversed));
  }
}
