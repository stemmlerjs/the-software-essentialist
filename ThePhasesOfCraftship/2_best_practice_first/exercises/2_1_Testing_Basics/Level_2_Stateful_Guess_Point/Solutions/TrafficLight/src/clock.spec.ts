
import { Clock } from './clock'

describe('clock', () => {
  let clock: Clock;

  beforeEach(() => {
    clock = new Clock();
  })
  
  it('starts at zero time elapsed', () => {
    expect(clock.getTotalTimeElapsedInSeconds()).toEqual(0);
  });

  it('keeps track of moving forward 30 seconds', () => {
    clock.advanceTimeInSeconds(30)
    expect(clock.getTotalTimeElapsedInSeconds()).toEqual(30);
  })
});