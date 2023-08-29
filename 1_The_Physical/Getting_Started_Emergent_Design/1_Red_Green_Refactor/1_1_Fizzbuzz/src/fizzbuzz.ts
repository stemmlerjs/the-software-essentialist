export const fizzBuzz = (input: number | string): string => {
  const n = Number(input);

  if (isNaN(n) || n < 1 || n > 100) {
    throw new Error("Input must be a number between 1 and 100.");
  }

  if (n % 15 === 0) {
    return "FizzBuzz";
  }
  if (n % 3 === 0) {
    return "Fizz";
  }
  if (n % 5 === 0) {
    return "Buzz";
  }
  return n.toString();
}
