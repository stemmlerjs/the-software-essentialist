export function fizzBuzz(inputNumber: number): string {
	if (typeof inputNumber !== 'number') throw new Error('Input number must be a number');
	if (inputNumber < 1) throw new Error('Input number must be >= 1');
	if (inputNumber > 100) throw new Error('Input number must be <= 100');
	
	const isDivisibleBy3 = inputNumber % 3 === 0;
	const isDivisibleBy5 = inputNumber % 5 === 0;
	const isDivisibleBy3And5 = isDivisibleBy3 && isDivisibleBy5;

	if (isDivisibleBy3And5) return 'FizzBuzz';
	if (isDivisibleBy3) return 'Fizz';
	if (isDivisibleBy5) return 'Buzz';
	return `${inputNumber}`;
}