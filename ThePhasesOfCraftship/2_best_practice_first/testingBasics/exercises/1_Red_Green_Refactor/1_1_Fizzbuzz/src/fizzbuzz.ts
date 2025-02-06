export function fizzBuzz(inputNumber: number): string {
	const isDivisibleBy3 = inputNumber % 3 === 0;
	const isDivisibleBy5 = inputNumber % 5 === 0;
	const isDivisibleBy3And5 = isDivisibleBy3 && isDivisibleBy5;
	
	if (isDivisibleBy3And5) return 'FizzBuzz';
	if (isDivisibleBy3) return 'Fizz';
	if (isDivisibleBy5) return 'Buzz';
	return `${inputNumber}`;
}