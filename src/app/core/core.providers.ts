import { Provider } from '@angular/core';

import { BusinessRepository } from '@core/ports/business.repository';
import { Clock } from '@core/ports/clock.port';
import { ContentRepository } from '@core/ports/content.repository';
import { PreferencesRepository } from '@core/ports/preferences.repository';
import { SystemPreferences } from '@core/ports/system-preferences.port';
import { TeamRepository } from '@core/ports/team.repository';
import { BrowserSystemPreferences } from '@core/adapters/browser-system-preferences.adapter';
import { LocalStoragePreferencesRepository } from '@core/adapters/local-storage-preferences.repository';
import { StaticBusinessRepository } from '@core/adapters/static-business.repository';
import { StaticContentRepository } from '@core/adapters/static-content.repository';
import { StaticTeamRepository } from '@core/adapters/static-team.repository';
import { SystemClock } from '@core/adapters/system-clock.adapter';

/** The only place that decides which adapter implements which port. */
export function provideCore(): Provider[] {
  return [
    { provide: ContentRepository, useClass: StaticContentRepository },
    { provide: BusinessRepository, useClass: StaticBusinessRepository },
    { provide: TeamRepository, useClass: StaticTeamRepository },
    { provide: PreferencesRepository, useClass: LocalStoragePreferencesRepository },
    { provide: Clock, useClass: SystemClock },
    { provide: SystemPreferences, useClass: BrowserSystemPreferences },
  ];
}
