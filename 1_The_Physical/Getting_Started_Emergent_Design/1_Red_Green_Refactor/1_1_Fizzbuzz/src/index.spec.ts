
// import {Fizzbuzz}  from './fizzbuzz'

// describe("fizzbuzz", () => {
//     let testVar = Fizzbuzz

//     test('should return a basic instance of fizzbuzz', () => {
//         expect (testVar).toEqual(Fizzbuzz)
//     })

//     test('it can return "Fizz" on multiples of 3', () => {
//         expect(testVar(3)).toBe("Fizz")
//         expect(testVar(27)).toBe("Fizz")
//         expect(testVar(71)).toBe("71")
//     })

//     test('it can return "Buzz" on multiples of 5', () => {
//         expect(testVar(5)).toBe("Buzz")
//         expect(testVar(55)).toBe("Buzz")
//         expect(testVar(83)).toBe("83")
//     })

//     test('it can return "FizzBuzz" on multiples of 3 and 5', () => {
//         expect(testVar(30)).toBe("FizzBuzz")
//         expect(testVar(60)).toBe("FizzBuzz")
//         expect(testVar(23)).toBe("23")
//     })
// });

// This was the answer given on the site.  

import { fizzbuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {

  it("outputs non-fizz, buzz, or fizzbuzz numbers such as 1, 2, and 4 strings", () => {
    [1, 2, 4].forEach((num) =>
      expect(typeof fizzbuzz(num) === "string").toBeTruthy()
    );
  });

  it("doesnt accept numbers less than 1 such as -1", () => {
    expect(() => fizzbuzz(-1)).toThrow("Too small");
  });

  it("does not accept numbers over 100 such as 101", () => {
    expect(() => fizzbuzz(101)).toThrow("Too large");
  });

  it("returns multiples of three such as 3, 6, 9, and 12 as fizz", () => {
    [3, 6, 9, 12]
      .map((multiple) => fizzbuzz(multiple))
      .forEach((m) => expect(m).toEqual("Fizz"));
  });

  it("returns multiples of five such as 5, 10, and 20 as buzz", () => {
    [5, 10, 20]
      .map((multiple) => fizzbuzz(multiple))
      .forEach((m) => expect(m).toEqual("Buzz"));
  });

  it("returns multiples of both such as 15 as FizzBuzz", () => {
    expect(fizzbuzz(15)).toEqual("FizzBuzz");
  });
});
