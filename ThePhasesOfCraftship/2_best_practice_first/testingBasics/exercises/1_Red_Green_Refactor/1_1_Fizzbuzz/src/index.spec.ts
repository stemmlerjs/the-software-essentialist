import { fizzbuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
  it("should return string", () => {
    expect(typeof fizzbuzz(5)).toBe("string");
  });

  it("should return fizz for 3", () => {
    expect(fizzbuzz(3)).toBe("fizz");
  });

  it("should return buzz for 5", () => {
    expect(fizzbuzz(5)).toBe("buzz");
  });
});
