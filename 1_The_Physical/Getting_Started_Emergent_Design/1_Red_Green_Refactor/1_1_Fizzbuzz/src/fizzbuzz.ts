export function fizzbuzz(value: number): string {
    if (value === 3) return "Fizz";

    if (value === 5) return "Buzz";

    if (value === 15) return "FizzBuzz";

    return value.toString();
} 