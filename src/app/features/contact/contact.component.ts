import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { BusinessProfileStore } from '@core/state/business-profile.store';
import { ContentRepository } from '@core/ports/content.repository';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { SECTION } from '@shared/constants/site-map.constants';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly content = inject(ContentRepository).getContent();
  protected readonly business = inject(BusinessProfileStore);
  protected readonly profile = this.business.profile;
  protected readonly section = SECTION;

  /** The map (and with it any data transfer to Google) only loads after the visitor clicks. */
  protected readonly mapLoaded = signal(false);
  protected readonly mapSrc = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.business.embedUrl),
  );
}
