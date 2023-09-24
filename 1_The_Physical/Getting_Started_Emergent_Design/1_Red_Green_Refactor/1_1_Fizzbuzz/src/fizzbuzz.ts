export function fizzbuzz(number: number) {
    const isAMultipleOfThree = number % 3 === 0;
    const isAMultipleOfFive = number % 5 === 0;

    if (isAMultipleOfFive && isAMultipleOfThree) return'FizzBuzz';
    if (isAMultipleOfFive) return 'Buzz';
    if (isAMultipleOfThree) return 'Fizz';
}