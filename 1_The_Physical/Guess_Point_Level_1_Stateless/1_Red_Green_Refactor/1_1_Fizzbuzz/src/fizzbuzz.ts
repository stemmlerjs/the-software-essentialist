export const fizzbuzz = (number: number): string => {
  if (typeof number !== 'number') throw new Error('Invalid input');

  return number.toString();
};
