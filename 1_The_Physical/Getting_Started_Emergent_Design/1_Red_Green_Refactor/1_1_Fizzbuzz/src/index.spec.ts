import { fizzbuzz } from './fizzbuzz';

/*
* each return value is a string
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
* */

describe("fizzbuzz", () => {
    it('returns "Fizz" for 3', () => {
        expect(fizzbuzz(3)).toBe('Fizz');
    });

    it('returns "Buzz" for 5', () => {
        expect(fizzbuzz(5)).toBe('Buzz');
    });

    it('returns "FizzBuzz" for 15', () => {
        expect(fizzbuzz(15)).toBe('FizzBuzz');
    });

    it.each([3, 6, 9])('returns "Fizz" for %#', () => {
        expect(fizzbuzz(9)).toBe('Fizz');
    });
});
