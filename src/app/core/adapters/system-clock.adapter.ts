import { Injectable } from '@angular/core';

import { BusinessTime, Weekday } from '@core/models/opening-hours.model';
import { Clock } from '@core/ports/clock.port';

/** Adapter: reads the time in Germany, whatever time zone the visitor is in. */
@Injectable()
export class SystemClock extends Clock {
  private readonly formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Berlin',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  now(): BusinessTime {
    const parts = this.formatter.formatToParts(new Date());
    const value = (type: Intl.DateTimeFormatPartTypes): string =>
      parts.find((part) => part.type === type)?.value ?? '';

    return {
      weekday: value('weekday') as Weekday,
      minutesOfDay: Number(value('hour')) * 60 + Number(value('minute')),
    };
  }
}
