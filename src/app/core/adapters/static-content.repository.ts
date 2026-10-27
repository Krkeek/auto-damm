import { Injectable } from '@angular/core';

import { SiteContent } from '@core/models/site-content.model';
import { ContentRepository } from '@core/ports/content.repository';
import { DE_CONTENT } from '@core/content/de.content';

/** Adapter: content bundled with the app. Swap for an HTTP/CMS adapter later without touching other layers. */
@Injectable()
export class StaticContentRepository extends ContentRepository {
  getContent(): SiteContent {
    return DE_CONTENT;
  }
}
