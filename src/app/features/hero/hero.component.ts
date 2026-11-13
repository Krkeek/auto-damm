import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BusinessProfileStore } from '@core/state/business-profile.store';
import { ContentRepository } from '@core/ports/content.repository';
import { OpeningHoursComponent } from '@features/hero/opening-hours/opening-hours.component';
import { SmoothScrollService } from '@shared/services/smooth-scroll.service';
import { IMAGES, SECTION } from '@shared/constants/site-map.constants';

@Component({
  selector: 'app-hero',
  imports: [OpeningHoursComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  private readonly smoothScroll = inject(SmoothScrollService);

  protected readonly content = inject(ContentRepository).getContent();
  protected readonly business = inject(BusinessProfileStore);
  protected readonly images = IMAGES;
  protected readonly section = SECTION;

  protected scrollDown(event: Event): void {
    event.preventDefault();
    this.smoothScroll.to(SECTION.services);
  }
}
