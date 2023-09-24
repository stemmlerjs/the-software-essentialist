export function fizzbuzz(number: number) {
    const isAMultipleOfThree = number % 3 === 0;
    const isAMultipleOfFive = number % 5 === 0;

    if(number < 1) throw new Error('Too small');
    if(number > 100) throw new Error('Too big');

    if (isAMultipleOfFive && isAMultipleOfThree) return'FizzBuzz';
    if (isAMultipleOfFive) return 'Buzz';
    if (isAMultipleOfThree) return 'Fizz';

    return number.toString();
}