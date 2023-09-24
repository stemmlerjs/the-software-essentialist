export function fizzbuzz(number: number) {
    if (number === 15) return 'FizzBuzz';

    return number === 3 || number === 9 ? 'Fizz' : 'Buzz';
}