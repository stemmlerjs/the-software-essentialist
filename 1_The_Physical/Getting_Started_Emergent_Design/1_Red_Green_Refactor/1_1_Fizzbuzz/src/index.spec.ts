import { fizzbuzz } from './fizzbuzz';

// - It outputs numbers as strings
// - It accepts numbers between 1 and 100
// - It rejects numbers lower than 1
// - It rejects numbers greater than 100

/*
- * each return value is a string
- 3 returns "Fizz"
- 5 returns "Buzz
- 15 returns "FizzBuzz"
- 9 returns "Fizz"
- 43 returns "43"
- 42 returns "Fizz"
- 45 returns "FizzBuzz"
- 102 (you decide, throw an Error or handle some other way)
- -12 (you decide, throw an Error or handle some other way)
- any non-number (you decide, throw an Error or handle some other way)
* */

describe("fizzbuzz", () => {
    it.each([1, 100])('accepts the edge number %s', (num) => {
        expect(fizzbuzz(num)).toBeTruthy();
    });

    it.each([3, 6, 9])('returns "Fizz" for %s', (num) => {
        expect(fizzbuzz(num)).toBe('Fizz');
    });

    it.each([5, 10, 20])('returns "Buzz" for %s', () => {
        expect(fizzbuzz(5)).toBe('Buzz');
    });

    it.each([15, 45])('returns "FizzBuzz" for %s', (num) => {
        expect(fizzbuzz(num)).toBe('FizzBuzz');
    });

    it.each([0, -1, -12])('throws an error for too small number %s', (num) => {
        expect(() => fizzbuzz(num)).toThrowError('Too small');
    });

    it.each([101, 102])('throws an error for too big number %s', (num) => {
        expect(() => fizzbuzz(num)).toThrowError('Too big');
    });
});
