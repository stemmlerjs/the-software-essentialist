import {BooleanCalculator, Expression, Result} from "./index";

describe('boolean calculator', () => {
    const testMessage = 'should know that the result for %s is %s';

    describe('single values', () => {
        const cases: [Expression, boolean][] = [
            ['TRUE', true],
            ['FALSE', false]
            ];
        it.each(cases)(testMessage, (expression: Expression, expected: boolean) => {
            expect(BooleanCalculator.run(expression)).toBe(expected);
        })
    })

    describe('NOT operator', () => {
        const cases: [Expression, boolean][] = [
            ['NOT FALSE', true],
            ['NOT TRUE', false]
        ];
        it.each(cases)(testMessage, (expression: Expression, expected: boolean) => {
            expect(BooleanCalculator.run(expression)).toBe(expected);
        })
    })

    describe('AND operator', () => {
        const cases: [Expression, boolean][] = [
            ['TRUE AND TRUE', true],
            ['TRUE AND FALSE', false]
        ];
        it.each(cases)(testMessage, (expression: Expression, expected: boolean) => {
            expect(BooleanCalculator.run(expression)).toBe(expected);
        })
    })

    describe('OR operator', () => {
        const cases: [Expression, boolean][] = [
            ['TRUE OR FALSE', true],
            ['FALSE OR FALSE', false]
        ];
        it.each(cases)(testMessage, (expression: Expression, expected: boolean) => {
            expect(BooleanCalculator.run(expression)).toBe(expected);
        })
    })

    describe('combination of operations and precedence', () => {
        const cases: [Expression, boolean][] = [
            ['TRUE OR TRUE OR TRUE AND FALSE', true],
            ['TRUE OR FALSE AND NOT FALSE', true],
            ['(TRUE OR TRUE OR TRUE) AND FALSE', false],
            ['NOT (TRUE AND TRUE)', false]
        ]
        it.each(cases)(testMessage, (expression: Expression, expected: boolean) => {
            expect(BooleanCalculator.run(expression)).toBe(expected);
        })
    })
})
