import { fizzbuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
  it("should return string", () => {
    expect(typeof fizzbuzz(5)).toBe("string");
  });
});
