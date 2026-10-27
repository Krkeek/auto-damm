import { Signal } from '@angular/core';

/** Port: settings of the visitor's device or browser. */
export abstract class SystemPreferences {
  abstract readonly prefersDark: Signal<boolean>;
  abstract readonly prefersReducedMotion: boolean;
}
