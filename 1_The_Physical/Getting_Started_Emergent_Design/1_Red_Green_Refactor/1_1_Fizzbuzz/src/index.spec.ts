import { fizzBuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {

  it("should return return a string", () => {
    expect(typeof fizzBuzz(5)).toBe("string");
  });

  it("should return Fizz when input is 3", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });
 
});
