import { Injectable, computed, inject, signal } from '@angular/core';

import { DEFAULT_LANGUAGE, Language } from '@core/models/language.model';
import { ContentRepository } from '@core/ports/content.repository';
import { PreferencesRepository } from '@core/ports/preferences.repository';

/** Current language and the matching site content. */
@Injectable({ providedIn: 'root' })
export class LanguageStore {
  private readonly contents = inject(ContentRepository);
  private readonly preferences = inject(PreferencesRepository);

  readonly language = signal<Language>(this.preferences.getLanguage() ?? DEFAULT_LANGUAGE);
  readonly content = computed(() => this.contents.get(this.language()));
  readonly otherLanguage = computed<Language>(() => (this.language() === 'de' ? 'en' : 'de'));

  toggle(): void {
    const next = this.otherLanguage();
    this.language.set(next);
    this.preferences.setLanguage(next);
  }
}
