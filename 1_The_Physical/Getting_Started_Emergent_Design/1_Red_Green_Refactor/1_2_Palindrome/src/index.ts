
export const palindromeChecker = (str: string): boolean => {
  const loweredStr = str.toLocaleLowerCase();
  return loweredStr === loweredStr.split('').reverse().join('');
}
