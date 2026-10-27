import { BusinessTime, OpeningSchedule } from '../models/opening-hours';

/** Business rule: is a schedule open at the given moment? Pure, no framework code. */
export class IsOpenUseCase {
  execute(schedule: OpeningSchedule, now: BusinessTime): boolean {
    return schedule.ranges.some(
      (range) =>
        range.days.includes(now.weekday) &&
        now.minutesOfDay >= range.fromHour * 60 &&
        now.minutesOfDay < range.toHour * 60,
    );
  }
}
