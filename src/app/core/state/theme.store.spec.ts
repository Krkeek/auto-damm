import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { Theme } from '@core/models/theme.model';
import { PreferencesRepository } from '@core/ports/preferences.repository';
import { SystemPreferences } from '@core/ports/system-preferences.port';
import { ThemeStore } from '@core/state/theme.store';

class FakePreferences extends PreferencesRepository {
  constructor(public theme: Theme | null) {
    super();
  }
  getTheme(): Theme | null {
    return this.theme;
  }
  setTheme(theme: Theme): void {
    this.theme = theme;
  }
}

function setup(stored: Theme | null, deviceDark: boolean) {
  const preferences = new FakePreferences(stored);
  const prefersDark = signal(deviceDark);
  TestBed.configureTestingModule({
    providers: [
      { provide: PreferencesRepository, useValue: preferences },
      { provide: SystemPreferences, useValue: { prefersDark, prefersReducedMotion: false } },
    ],
  });
  return { store: TestBed.inject(ThemeStore), preferences, prefersDark };
}

describe('ThemeStore', () => {
  it('follows the device when nothing is stored', () => {
    const { store, prefersDark } = setup(null, false);
    expect(store.preference()).toBeNull();
    expect(store.isDark()).toBe(false);

    prefersDark.set(true);
    expect(store.isDark()).toBe(true);
  });

  it('prefers the stored choice over the device', () => {
    const { store } = setup('light', true);
    expect(store.isDark()).toBe(false);
  });

  it('toggles and saves the new choice', () => {
    const { store, preferences } = setup(null, true);

    store.toggle();
    expect(store.isDark()).toBe(false);
    expect(preferences.theme).toBe('light');

    store.toggle();
    expect(store.isDark()).toBe(true);
    expect(preferences.theme).toBe('dark');
  });
});
