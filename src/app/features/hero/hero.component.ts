import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BusinessProfileStore } from '@core/state/business-profile.store';
import { LanguageStore } from '@core/state/language.store';
import { OpeningStatusStore } from '@core/state/opening-status.store';
import { SmoothScrollService } from '@shared/services/smooth-scroll.service';
import { IMAGES, SECTION } from '@shared/constants/site-map.constants';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  private readonly smoothScroll = inject(SmoothScrollService);

  protected readonly content = inject(LanguageStore).content;
  protected readonly business = inject(BusinessProfileStore);
  protected readonly status = inject(OpeningStatusStore);
  protected readonly images = IMAGES;
  protected readonly section = SECTION;

  protected scrollDown(event: Event): void {
    event.preventDefault();
    this.smoothScroll.to(SECTION.services);
  }
}
