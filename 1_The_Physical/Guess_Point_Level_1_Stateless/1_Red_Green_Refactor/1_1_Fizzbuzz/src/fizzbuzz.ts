export const fizzbuzz = (number: number): string => {
  if (typeof number !== 'number') throw new Error('Invalid input');
  if (number < 1 || number > 100) throw new Error('Input is out of 1 to 100 range');

  return number.toString();
};
