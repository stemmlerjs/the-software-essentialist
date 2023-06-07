
import { DateTime } from "../../domain/dateTime";
import { Clock } from "../clock";

export class SystemClock extends Clock {

  getCurrentTime (): DateTime {
    return DateTime.fromSystemDateTime(new Date())
  }

  tick (seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => resolve(), seconds * 1000));
  }
}