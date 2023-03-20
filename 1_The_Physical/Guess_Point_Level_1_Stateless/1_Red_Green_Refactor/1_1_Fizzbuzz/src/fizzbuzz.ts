const MIN_NUMBER_INPUT = 1
const MAX_NUMBER_INPUT = 100

function isInRange(num: number): boolean {
  return num >= MIN_NUMBER_INPUT && num <= MAX_NUMBER_INPUT
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

  let output = ''

  if (input % 3 === 0) {
    output = 'Fizz'
  }
  
  if (input % 5 === 0) {
    output = `${output}Buzz`
  }

  return output
}

export default fizzbuzz