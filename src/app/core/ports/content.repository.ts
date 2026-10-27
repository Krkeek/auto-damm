import { SiteContent } from '@core/models/site-content.model';

/** Port: where the site text comes from. */
export abstract class ContentRepository {
  abstract getContent(): SiteContent;
}
