import { Language } from '@core/models/language.model';
import { SiteContent } from '@core/models/site-content.model';

/** Port: where the translated site text comes from. */
export abstract class ContentRepository {
  abstract get(language: Language): SiteContent;
}
