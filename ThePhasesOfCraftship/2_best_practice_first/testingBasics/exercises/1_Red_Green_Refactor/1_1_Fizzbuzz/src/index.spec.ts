import { fizzbuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {

    it('should compile',  () => {
        expect(true).toBeTruthy();
    })

    it('should return "Fizz" if it get 3', () => {
        expect(fizzbuzz(3)).toBe("Fizz")
    })
});
