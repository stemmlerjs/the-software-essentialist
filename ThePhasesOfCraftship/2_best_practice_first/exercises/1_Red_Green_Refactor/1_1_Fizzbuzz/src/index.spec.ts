import { fizzBuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
  it("returns a string", () => {
    expect(typeof fizzBuzz(5)).toBe("string");
  });

  it.each([3, 9, 42])('returns "Fizz" for multiples of 3', (value: number) => {
    expect(fizzBuzz(value)).toEqual("Fizz");
  });

  it('5 returns "Buzz"', () => {
    expect(fizzBuzz(5)).toEqual("Buzz");
  });

  it('15 returns "FizzBuzz"', () => {
    expect(fizzBuzz(15)).toEqual("FizzBuzz");
  });

  it('43 returns "43"', () => {
    expect(fizzBuzz(43)).toEqual("43");
  });

  it('45 returns "FizzBuzz"', () => {
    expect(fizzBuzz(45)).toEqual("FizzBuzz");
  });

  it("102 throws an Error", () => {
    expect(() => fizzBuzz(102)).toThrowError("Number must not be above 100");
  });

  it("-12 throws an Error", () => {
    expect(() => fizzBuzz(-12)).toThrowError("Number must not be less than 1");
  });

  it('"43" throws an Error', () => {
    expect(() => fizzBuzz("43" as any)).toThrowError("Input must  be a number");
  });
});
