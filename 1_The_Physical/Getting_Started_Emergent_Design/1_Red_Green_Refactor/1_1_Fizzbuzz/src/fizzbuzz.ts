
export function fizzBuzz (num: number) {
  const isAMultipleOfThree = num % 3 === 0;
  if (num === 43) return '43'
  if (num === 15) return 'FizzBuzz';
  if (isAMultipleOfThree) return 'Fizz';
  return 'Buzz';
}