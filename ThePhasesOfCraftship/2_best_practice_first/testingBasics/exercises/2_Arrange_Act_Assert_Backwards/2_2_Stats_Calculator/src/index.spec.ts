import {Statistics, StatsCalculator} from "./index";

type HappyCase = [number[], Statistics];

describe('stats calculator', () => {
    const happyCases: HappyCase[] = [
        [[1, 2, 3], {
            min: 1,
            max: 3,
            numberOfElements: 3,
            average: 2
        }],
        [[2, 3, 1, 6], {
            min: 1,
            max: 6,
            numberOfElements: 4,
            average: 3
        }],
        [[2, 4, 21, -8, 53, 40], {
            min: -8,
            max: 53,
            numberOfElements: 6,
            average: 18.666666666666668
        }],
        [[0, 0, 0], {
            min: 0,
            max: 0,
            numberOfElements: 3,
            average: 0
        }]
    ];
    it.each(happyCases)("should know that for the numbers %s the result should be %s", (numbers, expected) => {
        expect(StatsCalculator.run(numbers)).toEqual(expected)
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