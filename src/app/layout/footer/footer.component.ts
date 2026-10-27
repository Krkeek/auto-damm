import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BusinessProfileStore } from '@core/state/business-profile.store';
import { ContentRepository } from '@core/ports/content.repository';
import { SmoothScrollService } from '@shared/services/smooth-scroll.service';
import { SECTION } from '@shared/constants/site-map.constants';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private readonly smoothScroll = inject(SmoothScrollService);

  protected readonly content = inject(ContentRepository).getContent();
  protected readonly profile = inject(BusinessProfileStore).profile;
  protected readonly section = SECTION;

  protected go(event: Event, id: string): void {
    event.preventDefault();
    this.smoothScroll.to(id);
  }
}
