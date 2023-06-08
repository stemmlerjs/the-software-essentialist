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

    it("returns 35 as Buzz", () => {
        const result = fizzbuzz(35);
        expect(result).toEqual("Buzz");
    });

    it("returns 15 as FizzBuzz", () => {
        const result = fizzbuzz(15);
        expect(result).toEqual("FizzBuzz");
    });

    it("returns 45 as FizzBuzz", () => {
        const result = fizzbuzz(45);
        expect(result).toEqual("FizzBuzz");
    });

    it("throws an error for 0", () => {
        expect(() => { fizzbuzz(0) }).toThrow("Input must be no less than 1");
    });

    it("throws an error for -5", () => {
        expect(() => { fizzbuzz(-5) }).toThrow("Input must be no less than 1");
    });

    it("throws an error for 102", () => {
        expect(() => { fizzbuzz(102) }).toThrow("Input must be no more than 100");
    });

    it("throws an error for 348", () => {
        expect(() => { fizzbuzz(348) }).toThrow("Input must be no more than 100");
    });

    it("throws an error when no number is passed in", () => {
        expect(fizzbuzz).toThrow("Input must be provided");
    });
});
