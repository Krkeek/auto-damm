import { Injectable, computed, inject, signal } from '@angular/core';

import { Theme } from '../domain/models/theme';
import { PreferencesRepository } from '../domain/ports/preferences.repository';
import { SystemPreferences } from '../domain/ports/system-preferences';

/** Light/dark mode. Without an explicit choice the device setting decides. */
@Injectable({ providedIn: 'root' })
export class ThemeStore {
  private readonly preferences = inject(PreferencesRepository);
  private readonly system = inject(SystemPreferences);

  /** `null` means "follow the device". */
  readonly preference = signal<Theme | null>(this.preferences.getTheme());

  readonly isDark = computed(
    () => (this.preference() ?? (this.system.prefersDark() ? 'dark' : 'light')) === 'dark',
  );

  toggle(): void {
    const next: Theme = this.isDark() ? 'light' : 'dark';
    this.preference.set(next);
    this.preferences.setTheme(next);
  }
}
