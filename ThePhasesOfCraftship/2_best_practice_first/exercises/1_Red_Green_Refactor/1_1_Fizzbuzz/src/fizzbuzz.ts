export function fizzBuzz(number: number) {
  const isMultipleOfThree = number % 3 === 0;
  const isMultipleOfFive = number % 5 === 0;

  if (typeof number != "number") throw new Error("Input must  be a number");
  else if (number < 1) throw new Error("Number must not be less than 1");
  else if (number > 100) throw new Error("Number must not be above 100");
  else if (isMultipleOfThree && isMultipleOfFive) return "FizzBuzz";
  else if (isMultipleOfThree) return "Fizz";
  else if (isMultipleOfFive) return "Buzz";
  else return number.toString();
}
