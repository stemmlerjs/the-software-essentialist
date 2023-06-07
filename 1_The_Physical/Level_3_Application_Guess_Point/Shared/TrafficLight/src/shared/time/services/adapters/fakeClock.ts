
import { DateTime } from "../../domain/dateTime";
import { Clock } from "../clock";

export class FakeClock extends Clock {
  private currentTime: DateTime;

  constructor (currentTime: DateTime) {
    super()
    this.currentTime = currentTime;
  }

  getCurrentTime (): DateTime {
    return this.currentTime;
  }

  async tick (seconds: number): Promise<void> {
    let currentTime = this.getCurrentTime();
    let newTime = currentTime.advance({ seconds });
    this.setCurrentTime(newTime);
  }

  setCurrentTime (currentTime: DateTime) {
    this.currentTime = currentTime;
  }
}