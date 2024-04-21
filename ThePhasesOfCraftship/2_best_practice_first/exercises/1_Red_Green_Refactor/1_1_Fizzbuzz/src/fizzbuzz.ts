export function fizzbuzz(num: number) {
  validateInput(num);

  const isDivisibleByThree = num % 3 === 0;
  const isDivisibleByFive = num % 5 === 0;

  if (isDivisibleByThree && isDivisibleByFive) {
    return 'FizzBuzz';
  }

  if (isDivisibleByFive) {
    return 'Buzz';
  }

  if (isDivisibleByThree) {
    return 'Fizz';
  }

  return String(num);
}

function validateInput(num: number) {
  // noinspection SuspiciousTypeOfGuard
  if (typeof num !== 'number') {
    throw new Error('Input must be a number');
  }

  if (1 > num || num > 100) {
    throw new Error('Number must be between 1 and 100');
  }
}
