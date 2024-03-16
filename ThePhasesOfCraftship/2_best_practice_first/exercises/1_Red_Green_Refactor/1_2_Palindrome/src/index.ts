function reverseString(str: string) {
  return str.split('').reverse().join('');
}

function stripSpaces(str: string) {
  return str.split(' ').join('');
}

export class PalindromeChecker {
  isAPalindrome(str: string): boolean {
    const reversed = reverseString(str);

    if (stripSpaces(str.toLowerCase()) !== stripSpaces(reversed.toLowerCase()))
      return false;
    return true;
  }
}
