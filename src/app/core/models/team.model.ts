import { Weekday } from './opening-hours.model';

/** A person visitors can meet on site, and the weekdays they are there. */
export interface TeamMember {
  readonly name: string;
  readonly days: readonly Weekday[];
}
