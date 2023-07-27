
import { SystemClock } from './adapters/systemClock';
import { FakeClock } from './adapters/fakeClock'
import { DateTime } from '../domain/dateTime';
import { Clock } from './clock';

describe('clock', () => {

  const timeoutSeconds = 15;
  const fakeStartTime = '2023-06-06T04:36:36.324Z'; 
  let clocks: Clock[] = [];

  beforeEach(() => {
    jest.setTimeout(timeoutSeconds * 1000);
    clocks = [
      new SystemClock(),
      new FakeClock(DateTime.fromSystemDateTime(new Date(fakeStartTime)))
    ]
  })

  it ('can tick forward for 4 seconds', async () => {
    for (let clock of clocks) {
      let startTime = clock.getCurrentTime();
      await clock.tick(4);
      let endTime = clock.getCurrentTime(); 
      let timePassedInSeconds = endTime.getSecondsBetween(startTime);
      expect(timePassedInSeconds).toEqual(4);
    }
  });
  

});