import { SystemClock } from '@core/adapters/system-clock.adapter';

describe('SystemClock', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('reports the time in Germany during winter time (UTC+1)', () => {
    vi.useFakeTimers({ now: new Date('2026-01-14T08:30:00Z') }); // Wednesday
    expect(new SystemClock().now()).toEqual({ weekday: 'Wed', minutesOfDay: 9 * 60 + 30 });
  });

  it('reports the time in Germany during summer time (UTC+2)', () => {
    vi.useFakeTimers({ now: new Date('2026-07-04T21:15:00Z') }); // Saturday
    expect(new SystemClock().now()).toEqual({ weekday: 'Sat', minutesOfDay: 23 * 60 + 15 });
  });

  it('rolls over to the next day across midnight', () => {
    vi.useFakeTimers({ now: new Date('2026-07-04T22:05:00Z') }); // Sunday 00:05 in Berlin
    expect(new SystemClock().now()).toEqual({ weekday: 'Sun', minutesOfDay: 5 });
  });
});
