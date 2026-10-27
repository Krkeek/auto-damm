import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import { Theme, isTheme } from '@core/models/theme.model';
import { PreferencesRepository } from '@core/ports/preferences.repository';

const THEME_KEY = 'theme';

/** Adapter: stores choices in localStorage. Fails silently when storage is unavailable (private mode, blocked cookies). */
@Injectable()
export class LocalStoragePreferencesRepository extends PreferencesRepository {
  private readonly window = inject(DOCUMENT).defaultView;

  getTheme(): Theme | null {
    const value = this.read(THEME_KEY);
    return isTheme(value) ? value : null;
  }

  setTheme(theme: Theme): void {
    this.write(THEME_KEY, theme);
  }

  private read(key: string): string | null {
    try {
      return this.window?.localStorage.getItem(key) ?? null;
    } catch {
      return null;
    }
  }

  private write(key: string, value: string): void {
    try {
      this.window?.localStorage.setItem(key, value);
    } catch {
      // Ignore: preferences are a convenience, not required.
    }
  }
}
