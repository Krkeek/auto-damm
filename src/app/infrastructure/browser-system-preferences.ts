import { DOCUMENT } from '@angular/common';
import { Injectable, Signal, inject, signal } from '@angular/core';

import { SystemPreferences } from '../domain/ports/system-preferences';

/** Adapter: reads dark-mode and reduced-motion settings through matchMedia. */
@Injectable()
export class BrowserSystemPreferences extends SystemPreferences {
  private readonly dark = signal(false);

  readonly prefersDark: Signal<boolean> = this.dark.asReadonly();
  readonly prefersReducedMotion: boolean;

  constructor() {
    super();
    const win = inject(DOCUMENT).defaultView;

    if (win?.matchMedia) {
      const darkQuery = win.matchMedia('(prefers-color-scheme: dark)');
      this.dark.set(darkQuery.matches);
      darkQuery.addEventListener('change', (event) => this.dark.set(event.matches));
      this.prefersReducedMotion = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } else {
      this.prefersReducedMotion = false;
    }
  }
}
