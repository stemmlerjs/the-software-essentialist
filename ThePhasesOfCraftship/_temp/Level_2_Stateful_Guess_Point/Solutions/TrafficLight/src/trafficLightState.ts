
import { Clock } from "./clock";
import { Light } from "./light";

// Information Holder
export class TrafficLightState {
  private currentLight: Light = "green";
  private trafficLightDeltaTime: number;

  constructor (clock: Clock) {
    let initialTimeInSeconds: number = clock.getTotalTimeElapsedInSeconds();
    this.trafficLightDeltaTime = initialTimeInSeconds;
    this.currentLight = "green"
    this.setupClockSubscription(clock);
  }

  private setupClockSubscription(clock: Clock) {
    clock.setClockSubscribers(
      (secondsPassedSinceLastTick: number, totalTimeElapsedInSeconds: number) => {
        this.trafficLightDeltaTime = totalTimeElapsedInSeconds;
      }
    );
  }

  getCurrentLight () {
    return this.currentLight;
  }

  setLight (light: Light) {
    this.currentLight = light;
  }

  getTrafficLightDeltaTime() {
    return this.trafficLightDeltaTime;
  }
}