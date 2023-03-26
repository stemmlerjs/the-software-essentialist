export const fizzbuzz = (number: number): string => {
  if (typeof number !== 'number') throw new Error('Invalid input');
  if (number < 1 || number > 100) throw new Error('Input is out of 1 to 100 range');

  const isMultipleOf3 = number % 3 === 0;
  const isMultipleOf5 = number % 5 === 0;
  const isMultipleOfBoth = isMultipleOf3 && isMultipleOf5;

  return isMultipleOfBoth
    ? 'FizzBuzz'
    : isMultipleOf3
    ? 'Fizz'
    : isMultipleOf5
    ? 'Buzz'
    : number.toString();
};
