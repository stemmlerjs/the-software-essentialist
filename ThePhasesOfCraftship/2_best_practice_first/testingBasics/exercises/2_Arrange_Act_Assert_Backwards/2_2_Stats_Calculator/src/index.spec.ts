import {StatsCalculator} from "./index";

describe('stats calculator', () => {
    it('should know that for the numbers 1, 2 and 3, the minimum is 1', () => {
        const result = {
            min: 1,
        }
        expect(StatsCalculator.run()).toEqual(result);
    })
})