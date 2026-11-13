import { BusinessTime, OpeningSchedule, StatusChange, WEEKDAYS } from '@core/models/opening-hours.model';

/** Business rule: when does a schedule next close (if open now) or open (if closed now)? Pure, no framework code. */
export class NextChangeUseCase {
  execute(schedule: OpeningSchedule, now: BusinessTime): StatusChange | null {
    const current = schedule.ranges.find(
      (range) =>
        range.days.includes(now.weekday) &&
        now.minutesOfDay >= range.fromHour * 60 &&
        now.minutesOfDay < range.toHour * 60,
    );
    if (current) {
      return { kind: 'closes', weekday: now.weekday, hour: current.toHour, daysAhead: 0 };
    }

    const today = WEEKDAYS.indexOf(now.weekday);
    for (let daysAhead = 0; daysAhead <= WEEKDAYS.length; daysAhead++) {
      const weekday = WEEKDAYS[(today + daysAhead) % WEEKDAYS.length];
      const openings = schedule.ranges
        .filter((range) => range.days.includes(weekday))
        .map((range) => range.fromHour)
        .filter((hour) => daysAhead > 0 || hour * 60 > now.minutesOfDay)
        .sort((a, b) => a - b);
      if (openings.length > 0) {
        return { kind: 'opens', weekday, hour: openings[0], daysAhead };
      }
    }
    return null;
  }
}
