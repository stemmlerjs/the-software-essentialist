function reverseString(str: string) {
  return str.split('').reverse().join('');
}

export class PalindromeChecker {
  isAPalindrome(str: string): boolean {
    const reversed = reverseString(str);

    if (
      str.toLowerCase().split(' ').join('') !==
      reversed.toLowerCase().split(' ').join('')
    )
      return false;
    return true;
  }
}
