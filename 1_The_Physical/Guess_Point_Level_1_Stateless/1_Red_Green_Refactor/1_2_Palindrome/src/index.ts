export const palindromeChecker = (input: string): boolean => {
  if (typeof input === 'undefined') throw new Error('Input should be provided');
  if (typeof input !== 'string') throw new Error('Input should be a string');

  const onlyLetters = input.replaceAll(/[^\w]|_/g, '').toLowerCase();

  if (onlyLetters.length < 3) throw new Error('Input should contain at least 3 letters');

  let i = 0;
  let j = onlyLetters.length - 1;

  while (i < j) {
    if (onlyLetters[i] !== onlyLetters[j]) return false;
    i++;
    j--;
  }

  return true;
};
