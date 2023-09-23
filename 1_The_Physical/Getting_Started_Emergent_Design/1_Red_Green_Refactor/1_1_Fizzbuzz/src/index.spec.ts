import { fizzbuzz } from './fizzbuzz';

describe("fizzbuzz", () => {
    it('returns "Fizz" for 3', () => {
        expect(fizzbuzz(3)).toBe('Fizz');
    });
});
