export const fizzbuzz = (number: number) => {
  if (typeof number !== "number")
    throw new Error("Provide argument is not type of number");
  
  if (number < 0 || number > 100)
    throw new Error("Provide number in range 1 to 100");

  if (number % 3 === 0 && number % 5 === 0) return "fizzbuzz";

  if (number % 3 === 0) return "fizz";

  if (number % 5 === 0) return "buzz";

  return number;
};
