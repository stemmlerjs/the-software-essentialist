const MAX_NUMBER_INPUT = 100
const MIN_NUMBER_INPUT = 1

function isInRange(num: number): boolean {
  return MIN_NUMBER_INPUT >= num && num <= MAX_NUMBER_INPUT
}

/**
 * FizzBuzz returns a string "Fizz" when a number is multiple of three and for multiples of five it returns “Buzz.” 
 * For numbers that are multiples of both three and five, it returns “FizzBuzz.”
 * @param input  number from 1 to 100
 * @throws if any number is outside of range 1 to 100
 */
export function fizzbuzz(input: number) {
  if (!isInRange(input)) {
    throw new RangeError(`Number ${input} is outside of range`)
  }
}

export default fizzbuzz