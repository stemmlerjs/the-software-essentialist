export function fizzbuzz(value: number): string {
    if (value === 0) throw new Error("Input must be greater than 0");

    if (value%15 === 0) return "FizzBuzz";

    if (value%3 === 0) return "Fizz";

    if (value%5 === 0) return "Buzz";

    return value.toString();
} 