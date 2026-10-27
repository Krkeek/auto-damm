import { Language } from '../models/language';
import { Theme } from '../models/theme';

/** Port: persistence of the visitor's choices. */
export abstract class PreferencesRepository {
  abstract getLanguage(): Language | null;
  abstract setLanguage(language: Language): void;
  abstract getTheme(): Theme | null;
  abstract setTheme(theme: Theme): void;
}
