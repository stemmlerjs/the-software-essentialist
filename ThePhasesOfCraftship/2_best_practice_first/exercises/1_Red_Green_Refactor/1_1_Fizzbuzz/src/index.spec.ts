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

  it('9 returns "Fizz"', () => {
    expect(fizzBuzz(9)).toEqual("Fizz");
  });

  it('43 returns "43"', () => {
    expect(fizzBuzz(43)).toEqual("43");
  });

  it('42 returns "Fizz"', () => {
    expect(fizzBuzz(42)).toEqual("Fizz");
  });
});
