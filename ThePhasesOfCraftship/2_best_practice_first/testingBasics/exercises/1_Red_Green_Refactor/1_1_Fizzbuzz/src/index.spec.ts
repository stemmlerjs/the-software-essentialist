import { fizzbuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
    const fizz = "Fizz";
    const buzz = "Buzz";
    const fizzBuzz = "FizzBuzz";
    
    const greaterThanZeroErrorMessage = "number should be greater than zero";
    const lowerOrEqualTo100ErrorMessage = "number should be lower or equal to 100";
    const nonNumberErrorMessage = "input should be a number";

    const happyCases = [
        [fizz, 3],
        [buzz, 5],
        [fizzBuzz, 15],
        [fizz, 9],
        ["1", 1],
        [fizz, 42],
        [fizzBuzz, 45],
        ["43", 43],

    ]

    test.each(happyCases)("should return %s if it get %s", (expected, n) => {
        expect(fizzbuzz(Number(n))).toBe(expected)
    })

    const unHappyCases = [
        [greaterThanZeroErrorMessage, 0],
        [greaterThanZeroErrorMessage, -10],
        [lowerOrEqualTo100ErrorMessage, 102]
    ]

    test.each(unHappyCases)("should throw error message %s if it get %s", (expected, n) => {
        expect(()=> fizzbuzz(Number(n))).toThrow(String(expected))
    })

    const nonNumberCases = [
        [nonNumberErrorMessage, null],
        [nonNumberErrorMessage, fizz],
        [nonNumberErrorMessage, undefined]
    ]

    // @ts-ignore
    test.each(nonNumberCases)('should throw an error message %s if it get %s', (expected, n) => {
        // @ts-ignore
        expect(() => fizzbuzz(n)).toThrow(expected)
    })
});
