export function fizzBuzz(number: number) {
  const isMultipleOfThree = number % 3 === 0;
  const isMultipleOfFive = number % 5 === 0;

  if (typeof number != "number") throw new Error("Input must  be a number");
  if (number < 1) throw new Error("Number must not be less than 1");
  if (number > 100) throw new Error("Number must not be above 100");
  if (isMultipleOfThree && isMultipleOfFive) return "FizzBuzz";
  if (isMultipleOfThree) return "Fizz";
  if (isMultipleOfFive) return "Buzz";
  return number.toString();
}
