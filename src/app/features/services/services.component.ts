import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ContentRepository } from '@core/ports/content.repository';
import { ParallaxDirective } from '@shared/directives/parallax.directive';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IMAGES, SECTION } from '@shared/constants/site-map.constants';

@Component({
  selector: 'app-services',
  imports: [RevealDirective, ParallaxDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  protected readonly content = inject(ContentRepository).getContent();
  protected readonly section = SECTION;

  protected readonly blocks = [
    { key: 'shop', dark: false, image: IMAGES.shop, position: '40% 50%', data: this.content.services.shop },
    { key: 'yard', dark: true, image: IMAGES.yard, position: '50% 50%', data: this.content.services.yard },
  ];
}
