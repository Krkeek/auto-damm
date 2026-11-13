import { Injectable } from '@angular/core';

import { Weekday } from '@core/models/opening-hours.model';
import { TeamMember } from '@core/models/team.model';
import { TeamRepository } from '@core/ports/team.repository';

const OPEN_DAYS: readonly Weekday[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const TEAM: readonly TeamMember[] = [
  { name: 'Heine', days: OPEN_DAYS },
  { name: 'Kirstin', days: OPEN_DAYS },
];

/** Adapter: the roster bundled with the app. */
@Injectable()
export class StaticTeamRepository extends TeamRepository {
  getTeam(): readonly TeamMember[] {
    return TEAM;
  }
}
