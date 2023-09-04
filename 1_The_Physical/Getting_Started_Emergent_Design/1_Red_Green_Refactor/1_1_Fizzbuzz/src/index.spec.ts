import { FizzBuzz } from "./FizzBuzz";

describe("FizzBuzz", () => {

  it("outputs non-fizz, buzz, or FizzBuzz numbers such as 1, 2, and 4 as strings", () => {
    [1, 2, 4].forEach((num) =>
      expect(typeof FizzBuzz(num) === "string").toBeTruthy()
    );
  });

  it("doesnt accept numbers less than 1 such as -1", () => {
    expect(() => FizzBuzz(-1)).toThrow("Too small");
  });

  it("does not accept numbers over 100 such as 101", () => {
    expect(() => FizzBuzz(101)).toThrow("Too large");
  });

  it("returns multiples of three such as 3, 6, 9, and 12 as fizz", () => {
    [3, 6, 9, 12]
      .map((multiple) => FizzBuzz(multiple))
      .forEach((m) => expect(m).toEqual("Fizz"));
  });

  it("returns multiples of five such as 5, 10, and 20 as buzz", () => {
    [5, 10, 20]
      .map((multiple) => FizzBuzz(multiple))
      .forEach((m) => expect(m).toEqual("Buzz"));
  });

  it("returns multiples of both such as 15 as FizzBuzz", () => {
    expect(FizzBuzz(15)).toEqual("FizzBuzz");
  });
});