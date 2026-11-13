import { Injectable, inject } from '@angular/core';

import { WEEKDAYS, Weekday } from '@core/models/opening-hours.model';
import { TeamRepository } from '@core/ports/team.repository';

/** The names of the people on site, for every weekday. */
export type TeamWeek = Readonly<Record<Weekday, readonly string[]>>;

/** Who visitors can meet on site on which day. */
@Injectable({ providedIn: 'root' })
export class TeamStore {
  private readonly team = inject(TeamRepository).getTeam();

  readonly week = Object.fromEntries(
    WEEKDAYS.map((day): [Weekday, readonly string[]] => [day, this.namesOn(day)]),
  ) as TeamWeek;

  private namesOn(day: Weekday): readonly string[] {
    return this.team.filter((member) => member.days.includes(day)).map((member) => member.name);
  }
}
