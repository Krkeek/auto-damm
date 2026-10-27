import { OpeningSchedule } from '@core/models/opening-hours.model';
import { IsOpenUseCase } from '@core/use-cases/is-open.use-case';

describe('IsOpenUseCase', () => {
  const useCase = new IsOpenUseCase();
  const schedule: OpeningSchedule = {
    ranges: [
      { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], fromHour: 9, toHour: 18 },
      { days: ['Sat'], fromHour: 9, toHour: 12 },
    ],
  };

  it('is open during weekday hours', () => {
    expect(useCase.execute(schedule, { weekday: 'Wed', minutesOfDay: 12 * 60 })).toBe(true);
  });

  it('opens exactly at the opening hour', () => {
    expect(useCase.execute(schedule, { weekday: 'Mon', minutesOfDay: 9 * 60 })).toBe(true);
  });

  it('is closed one minute before opening', () => {
    expect(useCase.execute(schedule, { weekday: 'Mon', minutesOfDay: 9 * 60 - 1 })).toBe(false);
  });

  it('is closed exactly at the closing hour', () => {
    expect(useCase.execute(schedule, { weekday: 'Fri', minutesOfDay: 18 * 60 })).toBe(false);
  });

  it('uses the shorter Saturday hours', () => {
    expect(useCase.execute(schedule, { weekday: 'Sat', minutesOfDay: 11 * 60 + 59 })).toBe(true);
    expect(useCase.execute(schedule, { weekday: 'Sat', minutesOfDay: 12 * 60 })).toBe(false);
  });

  it('is closed on Sunday', () => {
    expect(useCase.execute(schedule, { weekday: 'Sun', minutesOfDay: 12 * 60 })).toBe(false);
  });

  it('is closed when the schedule has no ranges', () => {
    expect(useCase.execute({ ranges: [] }, { weekday: 'Mon', minutesOfDay: 12 * 60 })).toBe(false);
  });
});
