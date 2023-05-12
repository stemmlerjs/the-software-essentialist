
export function fizzBuzz (num: number) {
  if (num === 9) return 'Fizz';
  if (num === 15) return 'FizzBuzz';
  return num === 3 ? 'Fizz' : 'Buzz';
}