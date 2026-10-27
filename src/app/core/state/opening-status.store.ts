import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';

import { Clock } from '@core/ports/clock.port';
import { BusinessRepository } from '@core/ports/business.repository';
import { IsOpenUseCase } from '@core/use-cases/is-open.use-case';

const REFRESH_MS = 30_000;

/** Whether the parts shop and the recycling yard are open right now. */
@Injectable({ providedIn: 'root' })
export class OpeningStatusStore {
  private readonly clock = inject(Clock);
  private readonly isOpen = inject(IsOpenUseCase);
  private readonly profile = inject(BusinessRepository).getProfile();
  private readonly now = signal(this.clock.now());

  readonly shopOpen = computed(() => this.isOpen.execute(this.profile.schedules.shop, this.now()));
  readonly yardOpen = computed(() => this.isOpen.execute(this.profile.schedules.yard, this.now()));

  constructor() {
    const timer = setInterval(() => this.now.set(this.clock.now()), REFRESH_MS);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }
}
