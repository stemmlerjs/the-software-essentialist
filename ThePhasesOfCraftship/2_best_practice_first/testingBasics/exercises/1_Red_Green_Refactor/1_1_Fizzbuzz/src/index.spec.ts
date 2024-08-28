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

    test('3 returns "Fizz"', ()=>{
        expect(fizzBuzz(3)).toBe('Fizz');        
    })

    test('5 returns "Buzz"', ()=>{
        expect(fizzBuzz(5)).toBe('Buzz');        
    })

    test('15 returns "FizzBuzz"', ()=>{
        expect(fizzBuzz(15)).toBe('FizzBuzz');        
    })

});
