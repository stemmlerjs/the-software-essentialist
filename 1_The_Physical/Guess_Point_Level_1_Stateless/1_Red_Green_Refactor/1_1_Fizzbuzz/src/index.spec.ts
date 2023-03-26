// @ts-nocheck
import { fizzbuzz } from './fizzbuzz';

describe('fizzbuzz', () => {
  // TODO: accepts numbers as arguments and returns its string representation
  it('accepts number as argument and returns its string representation', () => {
    expect(typeof fizzbuzz(1)).toBe('string');
    expect(typeof fizzbuzz(27)).toBe('string');

    expect(fizzbuzz(8)).toBe('8');
    expect(fizzbuzz(41)).toBe('41');
  });
  // TODO: it throws "Invalid input" error when called without argument or with non-number argument
  it('throws error when called without argument or with non-number', () => {
    expect(() => fizzbuzz()).toThrowError('Invalid input');
    expect(() => fizzbuzz('10')).toThrowError('Invalid input');
  });
  // TODO: throws "Input is out of 1 to 100 range" error when argument is out of acceptable range
  it('throws error when argument is out of acceptable range', () => {
    expect(() => fizzbuzz(0)).toThrowError('Input is out of 1 to 100 range');
    expect(() => fizzbuzz(101)).toThrowError('Input is out of 1 to 100 range');
  });
  // TODO: returns "Fizz" for multiples of 3
  it('returns "Fizz" for multiples of 3', () => {
    expect(fizzbuzz(3)).toBe('Fizz');
    expect(fizzbuzz(54)).toBe('Fizz');
    expect(fizzbuzz(81)).toBe('Fizz');
  });
  // TODO: returns "Buzz" for multiples of 5
  it('returns "Buzz" for multiples of 5', () => {
    expect(fizzbuzz(5)).toBe('Buzz');
    expect(fizzbuzz(20)).toBe('Buzz');
    expect(fizzbuzz(100)).toBe('Buzz');
  });
  // TODO: returns "FizzBuzz" for multiples of 3 and 5
  it('returns "FizzBuzz" for multiples of 3 and 5', () => {
    expect(fizzbuzz(15)).toBe('FizzBuzz');
    expect(fizzbuzz(30)).toBe('FizzBuzz');
    expect(fizzbuzz(45)).toBe('FizzBuzz');
  });
});
