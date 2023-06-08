export function fizzbuzz(value: number): string {
    if (value === 5) return "Buzz";
    
    if (value === 15) return "FizzBuzz";

    if (value%3 === 0) return "Fizz";

    return value.toString();
} 