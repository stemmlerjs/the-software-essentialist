import { fizzBuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
  it("returns a string", () => {
    expect(typeof fizzBuzz(5)).toBe("string");
  });

  it('3 returns "Fizz"', () => {
    expect(fizzBuzz(3)).toEqual("Fizz");
  });

  it('5 returns "Buzz"', () => {
    expect(fizzBuzz(5)).toEqual("Buzz");
  });

  it('15 returns "FizzBuzz"', () => {
    expect(fizzBuzz(15)).toEqual("FizzBuzz");
  });
});
