
export const palindromeChecker = (str: string): boolean => {
  const strippedLowStr = str.toLocaleLowerCase().replace(/\s/g, '');
  return strippedLowStr === strippedLowStr.split('').reverse().join('');
}
