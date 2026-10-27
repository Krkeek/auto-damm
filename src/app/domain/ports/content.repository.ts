import { Language } from '../models/language';
import { SiteContent } from '../models/site-content';

/** Port: where the translated site text comes from. */
export abstract class ContentRepository {
  abstract get(language: Language): SiteContent;
}
