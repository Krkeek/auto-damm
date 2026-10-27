import { BusinessTime } from '../models/opening-hours';

/** Port: the current time at the business location. */
export abstract class Clock {
  abstract now(): BusinessTime;
}
