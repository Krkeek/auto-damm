import { TestBed } from '@angular/core/testing';

import { TeamMember } from '@core/models/team.model';
import { TeamRepository } from '@core/ports/team.repository';
import { TeamStore } from '@core/state/team.store';

describe('TeamStore', () => {
  it('lists who is on site on each weekday, in roster order', () => {
    const team: TeamMember[] = [
      { name: 'Anna', days: ['Mon', 'Sat'] },
      { name: 'Bernd', days: ['Mon'] },
    ];
    TestBed.configureTestingModule({
      providers: [{ provide: TeamRepository, useValue: { getTeam: () => team } }],
    });
    const store = TestBed.inject(TeamStore);

    expect(store.week.Mon).toEqual(['Anna', 'Bernd']);
    expect(store.week.Sat).toEqual(['Anna']);
    expect(store.week.Sun).toEqual([]);
  });
});
