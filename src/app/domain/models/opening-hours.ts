export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export type Weekday = (typeof WEEKDAYS)[number];

/** One block of opening time that applies to one or more weekdays. */
export interface TimeRange {
  readonly days: readonly Weekday[];
  readonly fromHour: number;
  readonly toHour: number;
}

export interface OpeningSchedule {
  readonly ranges: readonly TimeRange[];
}

/** "Now" as seen at the business location, independent of the visitor's time zone. */
export interface BusinessTime {
  readonly weekday: Weekday;
  readonly minutesOfDay: number;
}
