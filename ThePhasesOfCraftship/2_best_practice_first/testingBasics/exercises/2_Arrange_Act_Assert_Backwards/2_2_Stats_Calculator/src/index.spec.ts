import {Statistics, StatsCalculator} from "./index";

describe('stats calculator', () => {
    it('should know that for the numbers 1, 2 and 3, the minimum is 1', () => {
        const numbers: number[] = [1, 2, 3];
        expect(StatsCalculator.run(numbers)).toHaveProperty('min')
        expect(StatsCalculator.run(numbers).min).toBe(1)
    })

    it('should know that for the numbers 1, 2 and 3, the maximum is 3', () => {
        const numbers: number[] = [1, 2, 3];
        expect(StatsCalculator.run(numbers)).toHaveProperty('max')
        expect(StatsCalculator.run(numbers).max).toBe(3)
    })

    it('should know that for the numbers 1, 2 and 3, the number of elements is 3', () => {
        const numbers: number[] = [1, 2, 3];
        expect(StatsCalculator.run(numbers)).toHaveProperty('numberOfElements')
        expect(StatsCalculator.run(numbers).numberOfElements).toBe(3)
    })

    it('should know that for the numbers 1, 2 and 3, the average is 2', () => {
        const numbers: number[] = [1, 2, 3];
        expect(StatsCalculator.run(numbers)).toHaveProperty('average')
        expect(StatsCalculator.run(numbers).average).toBe(2)
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

    it('should throw an error if the list contains a non number', () => {
        const numbers: number[] = [0, 0, Number("d")];

        expect(() => StatsCalculator.run(numbers)).toThrow();
    })
})