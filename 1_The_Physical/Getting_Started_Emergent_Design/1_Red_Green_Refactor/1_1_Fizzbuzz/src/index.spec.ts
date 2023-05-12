
import { fizzBuzz } from './fizzbuzz'

/**
 * 
 * 🔘 I have committed on every single transition from red to green to refactor
🔘 I have tests that validate the following statements 
3 returns "Fizz"
5 returns "Buzz
15 returns "FizzBuzz"
9 returns "Fizz"
43 returns "43"
42 returns "Fizz"
45 returns "FizzBuzz"
102 (you decide, throw an Error or handle some other way)
-12 (you decide, throw an Error or handle some other way)
any non-number (you decide, throw an Error or handle some other way)
🔘 Once I have made the aforementioned tests pass, I have refactored my test specifications to use it.each() to perform parameterization (see Tip #3 here)
🔘 There is no duplication in my test code or my production code
 */


describe("fizzbuzz", () => {

  it ('returns "Fizz" for 3', () => {
    expect(fizzBuzz(3)).toBe('Fizz')
  })

});
