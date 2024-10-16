import { fizzbuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
  it.each([3, 6, 9, 12])(
    "should return Fizz for multiples of 3 (%i)",
    (number) => {
      expect(fizzbuzz(number)).toBe("fizz");
    }
  );

  it.each([5, 10, 20])(
    "should return buzz for multiples of 5 (%i)",
    (number) => {
      expect(fizzbuzz(number)).toBe("buzz");
    }
  );

  it.each([15, 30, 45])(
    "should return fizzbuzz for multiples of 15 (%i)",
    (number) => {
      expect(fizzbuzz(number)).toBe("fizzbuzz");
    }
  );

  it.each([2, 4, 7, 11, 13, 17, 19, 28, 32, 43, 49, 58, 68, 79, 89, 98])(
    "should return number for any number (%i) that's not multiple of 3,5 nor 15`",
    (number) => {
      expect(fizzbuzz(number)).toBe(number);
    }
  );

  it.each([-1, -10])(
    "should throw an error when number (%i) negative",
    (number) => {
      expect(() => fizzbuzz(number)).toThrow(
        "Provide number in range 1 to 100"
      );
    }
  );

  it.each([101, 9999])(
    "should throw an error when number (%i) over 100",
    (number) => {
      expect(() => fizzbuzz(number)).toThrow(
        "Provide number in range 1 to 100"
      );
    }
  );

  it.each([true, "123", [], {}])(
    "should throw an error when given argument (%i) is not an number",
    (arg) => {
      expect(() => fizzbuzz(arg as any)).toThrow(
        "Provide argument is not type of number"
      );
    }
  );
});
