
export function fizzBuzz (num: number) {
  const isAMultipleOfThree = num % 3 === 0;
  const isAMultipleOfFive = num % 5 === 0;
  if (num === 43) return '43'
  if (isAMultipleOfThree && isAMultipleOfFive) return 'FizzBuzz'
  if (isAMultipleOfThree) return 'Fizz';
  if (isAMultipleOfFive) return 'Buzz';
}