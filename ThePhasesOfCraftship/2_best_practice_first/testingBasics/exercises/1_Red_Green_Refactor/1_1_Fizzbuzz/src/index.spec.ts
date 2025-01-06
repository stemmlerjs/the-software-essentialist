import { fizzbuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {

    it('should compile',  () => {
        expect(true).toBeTruthy();
    })

    it('should returns "Fizz" if it gets 3', () => {
        expect(fizzbuzz(3)).toBe("Fizz")
    })
});
