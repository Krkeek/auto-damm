import { OpeningSchedule } from '@core/models/opening-hours.model';
import { HoursOnDayUseCase } from '@core/use-cases/hours-on-day.use-case';

describe('HoursOnDayUseCase', () => {
  const useCase = new HoursOnDayUseCase();
  const schedule: OpeningSchedule = {
    ranges: [
      { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], fromHour: 9, toHour: 18 },
      { days: ['Sat'], fromHour: 9, toHour: 12 },
    ],
  };

  it('returns the weekday hours', () => {
    expect(useCase.execute(schedule, 'Wed')).toEqual([{ fromHour: 9, toHour: 18 }]);
  });

  it('returns the shorter Saturday hours', () => {
    expect(useCase.execute(schedule, 'Sat')).toEqual([{ fromHour: 9, toHour: 12 }]);
  });

  it('returns nothing for a day without hours', () => {
    expect(useCase.execute(schedule, 'Sun')).toEqual([]);
  });

  it('lists several blocks on one day earliest first', () => {
    const split: OpeningSchedule = {
      ranges: [
        { days: ['Mon'], fromHour: 14, toHour: 18 },
        { days: ['Mon'], fromHour: 9, toHour: 12 },
      ],
    };

    expect(useCase.execute(split, 'Mon')).toEqual([
      { fromHour: 9, toHour: 12 },
      { fromHour: 14, toHour: 18 },
    ]);
  });
});
