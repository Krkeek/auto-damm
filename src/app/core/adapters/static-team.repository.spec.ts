import { WEEKDAYS } from '@core/models/opening-hours.model';
import { StaticTeamRepository } from '@core/adapters/static-team.repository';

describe('StaticTeamRepository', () => {
  it('returns a roster with a name and valid weekdays for everyone', () => {
    const team = new StaticTeamRepository().getTeam();

    for (const member of team) {
      expect(member.name.trim()).not.toBe('');
      expect(member.days.length).toBeGreaterThan(0);
      expect(member.days.every((day) => WEEKDAYS.includes(day))).toBe(true);
    }
  });
});
