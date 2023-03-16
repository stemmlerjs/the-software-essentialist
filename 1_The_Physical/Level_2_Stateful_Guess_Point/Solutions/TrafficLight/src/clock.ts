
export class Clock {

  private totalTimeElapsedInSeconds: number = 0;
  private subscribers: Function [];

  constructor () {
    this.totalTimeElapsedInSeconds = 0;
    this.subscribers = [];
  }

  advanceTimeInSeconds (seconds: number): void {
    this.totalTimeElapsedInSeconds += seconds;
    this.notifySubscribers(seconds, this.totalTimeElapsedInSeconds);
  }

  getTotalTimeElapsedInSeconds () {
    return this.totalTimeElapsedInSeconds;
  }

  setClockSubscribers (subscriberCallback: Function) {
    this.subscribers.push(subscriberCallback);
  }

  notifySubscribers (secondsPassed: number, totalTimeElapsedInSeconds: number) {
    this.subscribers.forEach((s) => s(secondsPassed, totalTimeElapsedInSeconds))
  }
}