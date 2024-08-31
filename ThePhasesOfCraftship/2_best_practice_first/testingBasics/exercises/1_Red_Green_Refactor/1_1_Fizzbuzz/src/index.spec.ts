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

  it("should return fizz for multiplication 3", () => {
    expect(fizzbuzz(6)).toBe("fizz");
  });

  it("should return fizz for multiplication 5", () => {
    expect(fizzbuzz(10)).toBe("buzz");
  });
});
