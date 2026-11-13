import { OpeningSchedule } from '@core/models/opening-hours.model';
import { NextChangeUseCase } from '@core/use-cases/next-change.use-case';

describe('NextChangeUseCase', () => {
  const useCase = new NextChangeUseCase();
  const schedule: OpeningSchedule = {
    ranges: [
      { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], fromHour: 9, toHour: 18 },
      { days: ['Sat'], fromHour: 9, toHour: 12 },
    ],
  };

  it('reports the closing hour while open', () => {
    expect(useCase.execute(schedule, { weekday: 'Sat', minutesOfDay: 10 * 60 })).toEqual({
      kind: 'closes',
      weekday: 'Sat',
      hour: 12,
      daysAhead: 0,
    });
  });

  it('reports the opening later the same day', () => {
    expect(useCase.execute(schedule, { weekday: 'Mon', minutesOfDay: 7 * 60 })).toEqual({
      kind: 'opens',
      weekday: 'Mon',
      hour: 9,
      daysAhead: 0,
    });
  });

  it('reports the opening on the next day after closing time', () => {
    expect(useCase.execute(schedule, { weekday: 'Tue', minutesOfDay: 18 * 60 })).toEqual({
      kind: 'opens',
      weekday: 'Wed',
      hour: 9,
      daysAhead: 1,
    });
  });

  it('skips days without hours', () => {
    expect(useCase.execute(schedule, { weekday: 'Sat', minutesOfDay: 13 * 60 })).toEqual({
      kind: 'opens',
      weekday: 'Mon',
      hour: 9,
      daysAhead: 2,
    });
  });

  it('wraps to the same weekday next week', () => {
    const mondaysOnly: OpeningSchedule = { ranges: [{ days: ['Mon'], fromHour: 9, toHour: 12 }] };

    expect(useCase.execute(mondaysOnly, { weekday: 'Mon', minutesOfDay: 13 * 60 })).toEqual({
      kind: 'opens',
      weekday: 'Mon',
      hour: 9,
      daysAhead: 7,
    });
  });

  it('reports nothing when the schedule has no ranges', () => {
    expect(useCase.execute({ ranges: [] }, { weekday: 'Mon', minutesOfDay: 12 * 60 })).toBeNull();
  });
});
