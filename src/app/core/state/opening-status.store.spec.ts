import { TestBed } from '@angular/core/testing';

import { BusinessTime } from '@core/models/opening-hours.model';
import { BusinessRepository } from '@core/ports/business.repository';
import { Clock } from '@core/ports/clock.port';
import { OpeningStatusStore } from '@core/state/opening-status.store';
import { StaticBusinessRepository } from '@core/adapters/static-business.repository';
import { HoursOnDayUseCase } from '@core/use-cases/hours-on-day.use-case';
import { IsOpenUseCase } from '@core/use-cases/is-open.use-case';
import { NextChangeUseCase } from '@core/use-cases/next-change.use-case';

describe('OpeningStatusStore', () => {
  let now: BusinessTime;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({
      providers: [
        IsOpenUseCase,
        HoursOnDayUseCase,
        NextChangeUseCase,
        { provide: BusinessRepository, useClass: StaticBusinessRepository },
        { provide: Clock, useValue: { now: () => now } },
      ],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('reports shop and yard open on a weekday afternoon', () => {
    now = { weekday: 'Tue', minutesOfDay: 14 * 60 };
    const store = TestBed.inject(OpeningStatusStore);
    expect(store.shopOpen()).toBe(true);
    expect(store.yardOpen()).toBe(true);
  });

  it('reports only the shop open on Saturday morning', () => {
    now = { weekday: 'Sat', minutesOfDay: 10 * 60 };
    const store = TestBed.inject(OpeningStatusStore);
    expect(store.shopOpen()).toBe(true);
    expect(store.yardOpen()).toBe(false);
  });

  it('refreshes the status as time passes', () => {
    now = { weekday: 'Mon', minutesOfDay: 17 * 60 + 59 };
    const store = TestBed.inject(OpeningStatusStore);
    expect(store.shopOpen()).toBe(true);

    now = { weekday: 'Mon', minutesOfDay: 18 * 60 };
    vi.advanceTimersByTime(30_000);
    expect(store.shopOpen()).toBe(false);
  });

  it('lists the hours of every weekday', () => {
    now = { weekday: 'Mon', minutesOfDay: 12 * 60 };
    const store = TestBed.inject(OpeningStatusStore);
    expect(store.shopWeek.Sat).toEqual([{ fromHour: 9, toHour: 12 }]);
    expect(store.shopWeek.Sun).toEqual([]);
    expect(store.yardWeek.Fri).toEqual([{ fromHour: 10, toHour: 17 }]);
    expect(store.yardWeek.Sat).toEqual([]);
  });

  it('reports today and the next change of each schedule', () => {
    now = { weekday: 'Sat', minutesOfDay: 10 * 60 };
    const store = TestBed.inject(OpeningStatusStore);
    expect(store.today()).toBe('Sat');
    expect(store.shopNext()).toEqual({ kind: 'closes', weekday: 'Sat', hour: 12, daysAhead: 0 });
    expect(store.yardNext()).toEqual({ kind: 'opens', weekday: 'Mon', hour: 10, daysAhead: 2 });
  });

  it('stops the timer when destroyed', () => {
    now = { weekday: 'Mon', minutesOfDay: 12 * 60 };
    TestBed.inject(OpeningStatusStore);
    TestBed.resetTestingModule();
    expect(vi.getTimerCount()).toBe(0);
  });
});
