import { fizzBuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {

    describe('Should return the numbers as strings', ()=>{

        test('It should always return a string', ()=> {
            expect(typeof fizzBuzz(10)).toBe('string');
        })
    
        test('43 returns "43"', ()=>{
            expect(fizzBuzz(43)).toBe('43');        
        })
    
    })

    describe('For numbers that are multiples of both three and five, it returns “FizzBuzz.”', ()=>{
        
        test.each([
            [15, "FizzBuzz"],
            [30, "FizzBuzz"],
            [45, "FizzBuzz"]
        ])('For %i it should return %s', (input, expected) => {
            expect(fizzBuzz(input)).toBe(expected);
        });
        
    })

    describe('For multiples of three it returns “Fizz”', () => {
    
        test.each([
            [3, "Fizz"],
            [9, "Fizz"],
            [42, "Fizz"]
        ])('For %i it should return %s', (input, expected) => {
            expect(fizzBuzz(input)).toBe(expected);
        });
    
    });

    describe('For multiples of five it returns “Buzz”', ()=>{

        test('5 returns "Buzz"', ()=>{
            expect(fizzBuzz(5)).toBe('Buzz');        
        })

        test('10 returns "Buzz"', ()=>{
            expect(fizzBuzz(10)).toBe('Buzz');        
        })

    })

});
