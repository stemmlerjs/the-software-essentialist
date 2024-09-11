import { BooleanCalculator } from "./BooleanCalculator";

describe('boolean calculator', () => {

    it('Should evaluate "TRUE" as true', () => {
        // arrange
        const booleanStr = 'TRUE';

        // act
        const result = BooleanCalculator.Evaluate(booleanStr);

        // assert
        expect(result).toBe(true);
    })
})
