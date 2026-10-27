import { BusinessTime } from '@core/models/opening-hours.model';

/** Port: the current time at the business location. */
export abstract class Clock {
  abstract now(): BusinessTime;
}
