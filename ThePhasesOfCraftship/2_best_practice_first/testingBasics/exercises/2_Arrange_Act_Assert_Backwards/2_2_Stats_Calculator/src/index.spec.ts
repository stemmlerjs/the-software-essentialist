import {Statistics, StatsCalculator} from "./index";

describe('stats calculator', () => {
    it("should know that for the numbers 1, 2 and 3, the minimum is 1, the maximum is 3, the number of elements is 3 and the average is 2",  () => {
        const numbers: number[] = [1, 2, 3];

        const expected: Statistics = {
            min: 1,
            max: 3,
            numberOfElements: 3,
            average: 2
        }
        expect(StatsCalculator.run(numbers)).toEqual(expected);
    })

    it('should know that for the numbers 2, 3, 1 and 6 the minimum is 1, the maximum is 6, the number of elements is 4 and the average is 3', () => {
        const numbers: number[] = [2, 3, 1, 6];

        const expected: Statistics = {
            min: 1,
            max: 6,
            numberOfElements: 4,
            average: 3
        }
        expect(StatsCalculator.run(numbers)).toEqual(expected);
    })

    it('should know that for the numbers 2, 4, 21, -8, 53 and 40 the minimum is -8, the maximum is 53, the number of elements is 6 and the average is 18.666666666666668', () => {
        const numbers: number[] = [2, 4, 21, -8, 53, 40];

        const expected: Statistics = {
            min: -8,
            max: 53,
            numberOfElements: 6,
            average: 18.666666666666668
        }
        expect(StatsCalculator.run(numbers)).toEqual(expected);
    })

    it('should know that for the numbers 0, 0 and 0 the minimum is 0, the maximum is 0, the number of elements is 3 and the average is 0', () => {
        const numbers: number[] = [0, 0, 0];

        const expected: Statistics = {
            min: 0,
            max: 0,
            numberOfElements: 3,
            average: 0
        }
        expect(StatsCalculator.run(numbers)).toEqual(expected);
    })

    it('should throw an error message \"Input contains invalid numbers (e.g., NaN or non-numeric values).\" if the list contains a non number', () => {
        const numbers = [0, 0, "d"];

        // @ts-ignore
        expect(() => StatsCalculator.run(numbers)).toThrowError("Input contains invalid numbers (e.g., NaN or non-numeric values).");
    })

    it('should throw an error message \"Input must be a non-empty array of numbers.\" if the list is empty', () => {
        const numbers: number[] = [];

        expect(() => StatsCalculator.run(numbers)).toThrowError("Input must be a non-empty array of numbers.");
    })

    it('should throw an error message \"Input must be a non-empty array of numbers.\" if the input is an object', () => {
        const numbers= {
            a: 1,
            b: 2
        };

        // @ts-ignore
        expect(() => StatsCalculator.run(numbers)).toThrowError("Input must be a non-empty array of numbers.");
    })
})