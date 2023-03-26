export const fizzBuzz = (n: number): string => {
  if (n <= 0 || n > 100) {
    return 'The number range is between 1 and 100';
  }
  if (n % 15 === 0) {
    return 'FizzBuzz';
  }
  if (n % 3 === 0) {
    return 'Fizz';
  }
  if (n % 5 === 0) {
    return 'Buzz';
  }
  return n.toString();
};
