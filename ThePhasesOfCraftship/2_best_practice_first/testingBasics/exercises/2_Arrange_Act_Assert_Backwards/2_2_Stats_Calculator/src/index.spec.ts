import {StatsCalculator} from "./index";

describe('stats calculator', () => {
    it('should know that for the numbers 1, 2 and 3, the minimum is 1', () => {
        expect(StatsCalculator.run()).toHaveProperty('min')
        expect(StatsCalculator.run().min).toBe(1)
    })
})