import { DayHours, OpeningSchedule, Weekday } from '@core/models/opening-hours.model';

/** Business rule: the opening hours of a schedule on one weekday, earliest first. Pure, no framework code. */
export class HoursOnDayUseCase {
  execute(schedule: OpeningSchedule, weekday: Weekday): readonly DayHours[] {
    return schedule.ranges
      .filter((range) => range.days.includes(weekday))
      .map(({ fromHour, toHour }) => ({ fromHour, toHour }))
      .sort((a, b) => a.fromHour - b.fromHour);
  }
}
