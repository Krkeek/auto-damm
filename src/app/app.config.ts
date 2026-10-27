import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';

import { IsOpenUseCase } from './domain/use-cases/is-open.use-case';
import { provideInfrastructure } from './infrastructure/providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    // Domain use cases are plain classes; they are registered here so they can be injected and replaced in tests.
    { provide: IsOpenUseCase, useFactory: () => new IsOpenUseCase() },
    // Ports -> adapters.
    ...provideInfrastructure(),
  ],
};
