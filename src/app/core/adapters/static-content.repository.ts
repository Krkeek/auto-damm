import { Injectable } from '@angular/core';

import { Language } from '@core/models/language.model';
import { SiteContent } from '@core/models/site-content.model';
import { ContentRepository } from '@core/ports/content.repository';
import { DE_CONTENT } from '@core/content/de.content';
import { EN_CONTENT } from '@core/content/en.content';

/** Adapter: content bundled with the app. Swap for an HTTP/CMS adapter later without touching other layers. */
@Injectable()
export class StaticContentRepository extends ContentRepository {
  private readonly byLanguage: Readonly<Record<Language, SiteContent>> = {
    de: DE_CONTENT,
    en: EN_CONTENT,
  };

  get(language: Language): SiteContent {
    return this.byLanguage[language];
  }
}
