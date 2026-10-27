import { Theme } from '@core/models/theme.model';

/** Port: persistence of the visitor's choices. */
export abstract class PreferencesRepository {
  abstract getTheme(): Theme | null;
  abstract setTheme(theme: Theme): void;
}
