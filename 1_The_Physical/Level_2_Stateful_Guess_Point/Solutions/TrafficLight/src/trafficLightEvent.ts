import { Light } from "./light";

export type TrafficLightEventType = "TrafficLightStarted" | "LightTransitioned";

export interface TrafficLightEvent {
  type: TrafficLightEventType;
  data: {
    newState: {
      timeElapsed: number;
      light: Light;
    };
  };
}