export const palindromeChecker = (input: string): boolean => {
  if (typeof input === 'undefined') throw new Error('Input should be provided');
  if (typeof input !== 'string') throw new Error('Input should be a string');
  if (input.replaceAll(/[^\w]|_/g, '').length < 3)
    throw new Error('Input should contain at least 3 letters');

  return true;
};
