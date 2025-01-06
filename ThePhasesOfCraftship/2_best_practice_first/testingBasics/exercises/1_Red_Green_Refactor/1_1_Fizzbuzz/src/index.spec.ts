import { fizzbuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
    const greaterThanZeroErrorMessage = "number should be greater than zero";
    const lowerOrEqualTo100ErrorMessage = "number should be lower or equal to 100";
    const nonNumberErrorMessage = "input should be a number";

    const happyCases = [
        ["Fizz", 3],
        ["Buzz", 5],
        ["FizzBuzz", 15],
        ["Fizz", 9],
        ["1", 1],
        ["Fizz", 42],
        ["FizzBuzz", 45],
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
        [nonNumberErrorMessage, "Fizz"],
        [nonNumberErrorMessage, undefined]
    ]

    // @ts-ignore
    test.each(nonNumberCases)('should throw an error message %s if it get %s', (expected, n) => {
        // @ts-ignore
        expect(() => fizzbuzz(n)).toThrow(expected)
    })
});
