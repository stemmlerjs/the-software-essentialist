
import { Light } from "./light";
import { TrafficLightEvent, TrafficLightEventType } from "./trafficLightEvent";

export class TrafficLightEventsCollection {
  private events: TrafficLightEvent[];

  constructor () {
    this.events = [];
  }

  findEvent (type: TrafficLightEventType) {
   return this.events.find(
      (e) => e.type === type
    );
  }

  getEvents() {
    return this.events;
  }

  getLastEvent () {
    return this.events[this.events.length - 1]
  }

  addEvent(type: TrafficLightEventType, light: Light, timeElapsedInSeconds: number) {
    this.events.push({
      type,
      data: {
        newState: {
          light,
          timeElapsed: timeElapsedInSeconds,
        },
      },
    });
  }
}