import { ChangeDetectionStrategy, Component, Signal, computed, inject, signal } from '@angular/core';

import { StatusChange, WEEKDAYS, Weekday } from '@core/models/opening-hours.model';
import { ContentRepository } from '@core/ports/content.repository';
import { OpeningStatusStore, WeekHours } from '@core/state/opening-status.store';

/** One row of the opening hours box. */
interface Department {
  readonly id: string;
  readonly name: string;
  readonly week: WeekHours;
  readonly open: Signal<boolean>;
  readonly next: Signal<StatusChange | null>;
  /** Shown on a day without opening hours. */
  readonly offText: string;
}

/** The week strip in the hero: pick a day to see its hours; today also shows the live status. */
@Component({
  selector: 'app-opening-hours',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './opening-hours.component.html',
  styleUrl: './opening-hours.component.css',
})
export class OpeningHoursComponent {
  /** The day the visitor picked; today until they pick one. */
  private readonly pickedDay = signal<Weekday | null>(null);

  protected readonly content = inject(ContentRepository).getContent();
  protected readonly status = inject(OpeningStatusStore);
  protected readonly weekdays = WEEKDAYS;
  protected readonly selectedDay = computed(() => this.pickedDay() ?? this.status.today());
  protected readonly todaySelected = computed(() => this.selectedDay() === this.status.today());
  protected readonly departments: readonly Department[] = [
    {
      id: 'shop',
      name: this.content.hero.shop,
      week: this.status.shopWeek,
      open: this.status.shopOpen,
      next: this.status.shopNext,
      offText: this.content.hero.closed,
    },
    {
      id: 'yard',
      name: this.content.hero.yard,
      week: this.status.yardWeek,
      open: this.status.yardOpen,
      next: this.status.yardNext,
      offText: this.content.hero.byAppointment,
    },
  ];

  protected selectDay(day: Weekday): void {
    this.pickedDay.set(day);
  }

  protected dayLabel(day: Weekday): string {
    const name = this.content.hero.dayNames[day];
    return day === this.status.today() ? this.content.hero.today(name) : name;
  }

  /** The department's hours on the selected day, or null when it has none. */
  protected hoursText(department: Department): string | null {
    const hours = department.week[this.selectedDay()];
    return hours.length > 0
      ? hours.map(({ fromHour, toHour }) => this.content.hero.hours(fromHour, toHour)).join(', ')
      : null;
  }

  protected changeText(change: StatusChange): string {
    const text = this.content.hero;
    if (change.kind === 'closes') {
      return text.closesAt(change.hour);
    }
    if (change.daysAhead === 0) {
      return text.opensToday(change.hour);
    }
    return change.daysAhead === 1
      ? text.opensTomorrow(change.hour)
      : text.opensOn(text.dayShort[change.weekday], change.hour);
  }
}
