import { Injectable } from '@angular/core';

import { Language } from '../domain/models/language';
import { SiteContent } from '../domain/models/site-content';
import { ContentRepository } from '../domain/ports/content.repository';
import { DE_CONTENT } from './content/de.content';
import { EN_CONTENT } from './content/en.content';

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
