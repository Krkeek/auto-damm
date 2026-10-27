import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ContentRepository } from '@core/ports/content.repository';
import { ParallaxDirective } from '@shared/directives/parallax.directive';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IMAGES, SECTION } from '@shared/constants/site-map.constants';

@Component({
  selector: 'app-history',
  imports: [RevealDirective, ParallaxDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './history.component.html',
})
export class HistoryComponent {
  protected readonly content = inject(ContentRepository).getContent();
  protected readonly images = IMAGES;
  protected readonly section = SECTION;
}
