import { Clock } from './clock';

describe('Clock', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should notify observers of time changes', () => {
    const clock = new Clock();
    const observer = jest.fn();

    clock.subscribe(observer);
    clock.start(1); // 1 minute = 60 seconds

    jest.advanceTimersByTime(2000); // Advance 2 seconds

    expect(observer).toHaveBeenCalledTimes(2);
    expect(observer).toHaveBeenCalledWith(59); // First tick
    expect(observer).toHaveBeenCalledWith(58); // Second tick
  });

  it('should allow unsubscribing observers', () => {
    const clock = new Clock();
    const observer = jest.fn();

    const unsubscribe = clock.subscribe(observer);
    clock.start(1);

    jest.advanceTimersByTime(1000);
    expect(observer).toHaveBeenCalledTimes(1);

    unsubscribe();
    jest.advanceTimersByTime(1000);
    expect(observer).toHaveBeenCalledTimes(1); // Still only called once
  });

  it('should call onComplete when time is up', () => {
    const onComplete = jest.fn();
    const clock = new Clock(onComplete);

    clock.start(1);
    jest.advanceTimersByTime(60 * 1000); // Advance full minute

    expect(onComplete).toHaveBeenCalled();
  });
}); 