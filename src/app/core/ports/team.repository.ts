import { TeamMember } from '@core/models/team.model';

/** Port: who works on site on which days. */
export abstract class TeamRepository {
  abstract getTeam(): readonly TeamMember[];
}
