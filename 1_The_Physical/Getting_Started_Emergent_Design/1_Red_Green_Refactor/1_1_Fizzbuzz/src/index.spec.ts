import { fizzbuzz } from "./fizzbuzz"

describe("fizzbuzz", () => {
    it("returns a string", () => {
        const result = fizzbuzz(4);
        expect(typeof result).toBe("string");
    });

    it("returns 1 as a string", () => {
        const result = fizzbuzz(1);
        expect(result).toEqual("1");
    });

    it("returns 3 as Fizz", () => {
        const result = fizzbuzz(3);
        expect(result).toEqual("Fizz");
    });

    it("returns 27 as Fizz", () => {
        const result = fizzbuzz(27);
        expect(result).toEqual("Fizz");
    });

    it("returns 5 as Buzz", () => {
        const result = fizzbuzz(5);
        expect(result).toEqual("Buzz");
    });

    it("returns 15 as FizzBuzz", () => {
        const result = fizzbuzz(15);
        expect(result).toEqual("FizzBuzz");
    });
});
