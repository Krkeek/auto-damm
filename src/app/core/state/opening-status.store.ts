import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';

import { DayHours, OpeningSchedule, WEEKDAYS, Weekday } from '@core/models/opening-hours.model';
import { Clock } from '@core/ports/clock.port';
import { BusinessRepository } from '@core/ports/business.repository';
import { HoursOnDayUseCase } from '@core/use-cases/hours-on-day.use-case';
import { IsOpenUseCase } from '@core/use-cases/is-open.use-case';
import { NextChangeUseCase } from '@core/use-cases/next-change.use-case';

const REFRESH_MS = 30_000;

/** The opening hours of one schedule for every weekday. */
export type WeekHours = Readonly<Record<Weekday, readonly DayHours[]>>;

/** Opening hours of the parts shop and the recycling yard, and whether each is open right now. */
@Injectable({ providedIn: 'root' })
export class OpeningStatusStore {
  private readonly clock = inject(Clock);
  private readonly isOpen = inject(IsOpenUseCase);
  private readonly hoursOnDay = inject(HoursOnDayUseCase);
  private readonly nextChange = inject(NextChangeUseCase);
  private readonly profile = inject(BusinessRepository).getProfile();
  private readonly now = signal(this.clock.now());

  readonly today = computed(() => this.now().weekday);

  readonly shopWeek = this.weekOf(this.profile.schedules.shop);
  readonly yardWeek = this.weekOf(this.profile.schedules.yard);

  readonly shopOpen = computed(() => this.isOpen.execute(this.profile.schedules.shop, this.now()));
  readonly yardOpen = computed(() => this.isOpen.execute(this.profile.schedules.yard, this.now()));

  readonly shopNext = computed(() => this.nextChange.execute(this.profile.schedules.shop, this.now()));
  readonly yardNext = computed(() => this.nextChange.execute(this.profile.schedules.yard, this.now()));

  constructor() {
    const timer = setInterval(() => this.now.set(this.clock.now()), REFRESH_MS);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  private weekOf(schedule: OpeningSchedule): WeekHours {
    return Object.fromEntries(WEEKDAYS.map((day) => [day, this.hoursOnDay.execute(schedule, day)])) as WeekHours;
  }
}
