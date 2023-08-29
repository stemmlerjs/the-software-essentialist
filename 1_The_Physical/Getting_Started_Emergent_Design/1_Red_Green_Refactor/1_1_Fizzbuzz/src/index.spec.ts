import { fizzBuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {

  it("should return return a string", () => {
    expect(typeof fizzBuzz(5)).toBe("string");
  });

  it ("returns multiples of three as 'Fizz'", () => {
    [3, 6, 9, 12].map((multiple) => fizzBuzz(multiple))
      .forEach((m) => expect(m).toEqual("Fizz"))
  });
 
  test("should return 'Buzz' when input is 5", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });

  it ("returns multiples of three and five as 'FizzBuzz'", () => {
    [15, 45].map((multiple) => fizzBuzz(multiple))
      .forEach((m) => expect(m).toEqual("FizzBuzz"))
  });

  test("should return '43' when input is 43", () => {
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
