import { Language } from '@core/models/language.model';
import { Theme } from '@core/models/theme.model';

/** Port: persistence of the visitor's choices. */
export abstract class PreferencesRepository {
  abstract getLanguage(): Language | null;
  abstract setLanguage(language: Language): void;
  abstract getTheme(): Theme | null;
  abstract setTheme(theme: Theme): void;
}
