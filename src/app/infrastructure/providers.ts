import { Provider } from '@angular/core';

import { BusinessRepository } from '../domain/ports/business.repository';
import { Clock } from '../domain/ports/clock';
import { ContentRepository } from '../domain/ports/content.repository';
import { PreferencesRepository } from '../domain/ports/preferences.repository';
import { SystemPreferences } from '../domain/ports/system-preferences';
import { BrowserSystemPreferences } from './browser-system-preferences';
import { LocalStoragePreferencesRepository } from './local-storage-preferences.repository';
import { StaticBusinessRepository } from './static-business.repository';
import { StaticContentRepository } from './static-content.repository';
import { SystemClock } from './system-clock';

/** The only place that decides which adapter implements which port. */
export function provideInfrastructure(): Provider[] {
  return [
    { provide: ContentRepository, useClass: StaticContentRepository },
    { provide: BusinessRepository, useClass: StaticBusinessRepository },
    { provide: PreferencesRepository, useClass: LocalStoragePreferencesRepository },
    { provide: Clock, useClass: SystemClock },
    { provide: SystemPreferences, useClass: BrowserSystemPreferences },
  ];
}
