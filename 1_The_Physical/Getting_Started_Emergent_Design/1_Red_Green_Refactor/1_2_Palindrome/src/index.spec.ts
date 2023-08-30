import { palindromeChecker } from './index';

describe('palindrome checker', () => {

  // "mom" returns true
  // "Mom" returns true
  // "MoM" returns true
  // "Momx" returns false
  // "xMomx" returns true
  // "Was It A Rat I Saw" returns true
  // "Never Odd or Even" returns true
  // "Never Odd or Even1" returns false 
  // "1Never Odd or Even1" returns true

  it('returns true for "mom"', () => {
    expect(palindromeChecker('mom')).toBe(true);
  });

  it('returns true for "Mom"', () => {
    expect(palindromeChecker('Mom')).toBe(true);
  });

  it('returns true for "MoM"', () => {
    expect(palindromeChecker('MoM')).toBe(true);
  });

  it('returns false for "Momx"', () => {
    expect(palindromeChecker('Momx')).toBe(false);
  });

  it('returns false for "bill"', () => {
    expect(palindromeChecker('bill')).toBe(false);
  });
  
});
