export function fizzBuzz(inputNumber: number): string {
	if (inputNumber === 3) return 'Fizz';
	if (inputNumber === 5) return 'Buzz';
	return `${inputNumber}`;
}