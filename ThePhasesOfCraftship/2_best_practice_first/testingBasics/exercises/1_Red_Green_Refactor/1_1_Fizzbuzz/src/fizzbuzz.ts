export function fizzBuzz(inputNumber: number): string {
	const isDivisibleBy3 = inputNumber % 3 === 0;
	if (isDivisibleBy3) return 'Fizz';
	if (inputNumber === 5) return 'Buzz';
	return `${inputNumber}`;
}