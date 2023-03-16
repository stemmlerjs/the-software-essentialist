
import { Clock } from "./clock";
import { Light } from "./light";
import { TrafficLightEventsCollection } from "./trafficLightEventsCollection";
import { TrafficLightState } from "./trafficLightState";

// Controller
export class TrafficLight {
  private state: TrafficLightState;
  private eventsCollection: TrafficLightEventsCollection;

  constructor(clock: Clock) {
    this.state = new TrafficLightState(clock);
    this.eventsCollection = new TrafficLightEventsCollection();
    this.setupClockSubscription(clock);
  }

  private setupClockSubscription(clock: Clock) {
    clock.setClockSubscribers(() => this.advance());
  }

  public getLight(): Light {
    return this.state.getCurrentLight();
  }

  public advance() {
    let totalTimeElapsedInSeconds = this.getTotalTimeElapsed();

    if (this.shouldStart()) {
      this.eventsCollection.addEvent('TrafficLightStarted', 'green', totalTimeElapsedInSeconds);
    }

    if (this.shouldAdvanceToGreen(totalTimeElapsedInSeconds)) {
      this.state.setLight("green");
      this.eventsCollection.addEvent('LightTransitioned', 'green', totalTimeElapsedInSeconds);
      return;
    }

    if (this.shouldAdvanceToRed(totalTimeElapsedInSeconds)) {
      this.state.setLight("red");
      this.eventsCollection.addEvent('LightTransitioned', 'red', totalTimeElapsedInSeconds);
      return;
    }

    // implicit is green
    if (this.shouldAdvanceToYellow(totalTimeElapsedInSeconds)) {
      this.state.setLight("yellow");
      this.eventsCollection.addEvent('LightTransitioned', 'yellow', totalTimeElapsedInSeconds);
      return;
    }
  }

  public getEvents () {
    return this.eventsCollection.getEvents();
  }

  private getTotalTimeElapsed(): number {
    return this.state.getTrafficLightDeltaTime();
  }

  private shouldStart() {
    let hasntYetStarted = !this.eventsCollection.findEvent("TrafficLightStarted");
    return this.state.getTrafficLightDeltaTime() === 1 && hasntYetStarted;
  }

  private hasTransitionedToLastCycle (light: Light): boolean {
    return this.eventsCollection.getLastEvent() && this.eventsCollection.getLastEvent().data.newState.light === light
  }

  private shouldAdvanceToGreen(currentTotalTimeElapsedInSeconds: number) {
    let hasNotTransitionedToGreenThisCycle = !this.hasTransitionedToLastCycle('green')
    let currentTime = this.state.getTrafficLightDeltaTime();
    return currentTime >= 60 && hasNotTransitionedToGreenThisCycle;
  }

  private shouldAdvanceToRed(currentTotalTimeElapsedInSeconds: number) {
    let hasNotTransitionedToRedThisCycle = !this.hasTransitionedToLastCycle('red')
    let currentTime = this.state.getTrafficLightDeltaTime();
    return currentTime >= 35 && currentTime < 60 && hasNotTransitionedToRedThisCycle;
  }

  private shouldAdvanceToYellow(currentTotalTimeElapsedInSeconds: number): boolean {
    let hasNotTransitionedToYellowThisCycle = !this.hasTransitionedToLastCycle('yellow')
    let currentTime = this.state.getTrafficLightDeltaTime();
    return currentTime >= 30 && currentTime < 35 && hasNotTransitionedToYellowThisCycle;
  }
}
