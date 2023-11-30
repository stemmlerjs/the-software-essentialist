
import { TrafficLight } from './trafficLight'
import { Clock } from './clock'

describe('traffic light', () => {
  let clock: Clock;
  let trafficLight: TrafficLight

  beforeEach(() => {
    clock = new Clock();
    trafficLight = new TrafficLight(clock); 
  })
  
  it('starts in green', () => {
    expect(trafficLight.getLight()).toEqual('green')
  });

  it('only advances to yellow from green after 30 seconds', () => {
    clock.advanceTimeInSeconds(30);

    expect(trafficLight.getLight()).toEqual('yellow')
    expect(clock.getTotalTimeElapsedInSeconds()).toEqual(30)
  })

  it ('should be in red after 35 seconds', () => {
    clock.advanceTimeInSeconds(35);
    expect(trafficLight.getLight()).toEqual('red')
  });

  it ('should be back to green after 60 seconds', () => {
    clock.advanceTimeInSeconds(60);
    expect(trafficLight.getLight()).toEqual('green')
  });

  it ('should create 4 events in 70 seconds', () => {
    for (let i = 0; i < 70; i++) {
      clock.advanceTimeInSeconds(1)
    }
    expect(trafficLight.getEvents()).toHaveLength(4);
    expect(trafficLight.getEvents()[0]).toEqual({ type: 'TrafficLightStarted', data: { newState: { light: 'green', timeElapsed: 1 } }})
    expect(trafficLight.getEvents()[1]).toStrictEqual({ type: 'LightTransitioned', data: { newState: { light: 'yellow', timeElapsed: 30 } }})
    expect(trafficLight.getEvents()[2]).toStrictEqual({ type: 'LightTransitioned', data: { newState: { light: 'red', timeElapsed: 35 } }})
    expect(trafficLight.getEvents()[3]).toStrictEqual({ type: 'LightTransitioned', data: { newState: { light: 'green', timeElapsed: 60 } }})
  })

})
