import { Injectable } from '@angular/core';

import { parseOwnerSettings } from '@core/models/owner-settings.model';
import { TeamMember } from '@core/models/team.model';
import { TeamRepository } from '@core/ports/team.repository';
import rawSettings from '@core/content/owner-settings.json';

/** The roster comes from the file the owner edits on the admin page. */
const TEAM = parseOwnerSettings(rawSettings).team;

/** Adapter: the roster bundled with the app. */
@Injectable()
export class StaticTeamRepository extends TeamRepository {
  getTeam(): readonly TeamMember[] {
    return TEAM;
  }
}
