
import { DateTime } from "../domain/dateTime";

export abstract class Clock {

  /**
   * Returns the curren time
   */

  abstract getCurrentTime (): DateTime;

  /**
   * Advances time forward by # of seconds.
   */

  abstract tick (forSeconds: number): Promise<void>;
}