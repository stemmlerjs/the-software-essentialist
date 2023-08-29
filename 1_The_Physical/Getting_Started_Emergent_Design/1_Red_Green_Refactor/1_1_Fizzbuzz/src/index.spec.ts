import { fizzBuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {

  it("should return return a string", () => {
    expect(typeof fizzBuzz(5)).toBe("string");
  });

  it ("returns multiples of three such as 3, 6, 9, and 12 as 'Fizz'", () => {
    [3, 6, 9, 12].map((multiple) => fizzBuzz(multiple))
      .forEach((m) => expect(m).toEqual("Fizz"))
  });

  it("returns multiples of five such as 5, 10, and 20 as buzz", () => {
    [5, 10, 20].map((multiple) => fizzBuzz(multiple))
      .forEach((m) => expect(m).toEqual("buzz"));
  });

  it ("returns multiples of both such as 15 and 45 as 'FizzBuzz'", () => {
    [15, 45].map((multiple) => fizzBuzz(multiple))
      .forEach((m) => expect(m).toEqual("FizzBuzz"))
  });

  test("returns string output of a number such as 43 -> '43'", () => {
    expect(fizzBuzz(43)).toBe("43");
  });

  test("should throw an error when input is 102", () => {
    expect(() => fizzBuzz(102)).toThrow("Input must be a number between 1 and 100.");
  });

  test("should throw an error when input is -12", () => {
    expect(() => fizzBuzz(-12)).toThrow("Input must be a number between 1 and 100.");
  });

  test("should throw an error when input is not a number", () => {
    expect(() => fizzBuzz("abc")).toThrow("Input must be a number between 1 and 100.");
  });

});
