import { fizzBuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {

  it("should return return a string", () => {
    expect(typeof fizzBuzz(5)).toBe("string");
  });

  it("should return 'Fizz' when input is 3", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });
 
  test("should return 'Buzz' when input is 5", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });

  test("should return 'FizzBuzz' when input is 15", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  test("should return 'Fizz' when input is 9", () => {
    expect(fizzBuzz(9)).toBe("Fizz");
  });

  test("should return '43' when input is 43", () => {
    expect(fizzBuzz(43)).toBe("43");
  });

  test("should return 'Fizz' when input is 42", () => {
    expect(fizzBuzz(42)).toBe("Fizz");
  });

  test("should return 'FizzBuzz' when input is 45", () => {
    expect(fizzBuzz(45)).toBe("FizzBuzz");
  });

});
