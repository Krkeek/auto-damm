import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';

import { HoursOnDayUseCase } from '@core/use-cases/hours-on-day.use-case';
import { IsOpenUseCase } from '@core/use-cases/is-open.use-case';
import { NextChangeUseCase } from '@core/use-cases/next-change.use-case';
import { provideCore } from '@core/core.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    // Domain use cases are plain classes; they are registered here so they can be injected and replaced in tests.
    { provide: IsOpenUseCase, useFactory: () => new IsOpenUseCase() },
    { provide: HoursOnDayUseCase, useFactory: () => new HoursOnDayUseCase() },
    { provide: NextChangeUseCase, useFactory: () => new NextChangeUseCase() },
    // Ports -> adapters.
    ...provideCore(),
  ],
};
